import argparse
import os
from typing import List, Tuple, Dict

from faster_whisper import WhisperModel
from transformers import pipeline
import torch
from moviepy.video.io.VideoFileClip import VideoFileClip


def select_video_gui() -> str:
    """Open a file dialog to choose a video and return its path."""
    try:
        import tkinter as tk
        from tkinter import filedialog
    except Exception:
        return ""

    root = tk.Tk()
    root.withdraw()
    path = filedialog.askopenfilename(
        title="Select video file",
        filetypes=[
            ("Video files", "*.mp4 *.mov *.mkv *.avi *.flv *.webm"),
            ("All files", "*.*"),
        ],
    )
    root.destroy()
    return path


def transcribe(video_path: str, model_name: str = "base") -> List[Dict]:
    """Transcribe a video using faster-whisper."""
    device = "cuda" if torch.cuda.is_available() else "cpu"
    model = WhisperModel(model_name, device=device)
    segments, _ = model.transcribe(video_path)
    return [
        {"start": seg.start, "end": seg.end, "text": seg.text}
        for seg in segments
    ]


def summarize_text(text: str, model_name: str = "t5-small") -> str:
    """Summarize text using a transformers pipeline."""
    device = 0 if torch.cuda.is_available() else -1
    summarizer = pipeline("summarization", model=model_name, device=device)
    summary = summarizer(text, max_length=60, min_length=20)[0]["summary_text"]
    return summary


def generate_title_description(text: str, model_name: str = "t5-small") -> Tuple[str, str]:
    """Generate a short title and multi-sentence description from text."""
    device = 0 if torch.cuda.is_available() else -1
    summarizer = pipeline("summarization", model=model_name, device=device)
    title = summarizer(text, max_length=15, min_length=5)[0]["summary_text"].strip()
    description = summarizer(text, max_length=80, min_length=30)[0]["summary_text"].strip()
    return title, description


def find_highlight_segments(
    segments: List[Dict], summary: str, num_clips: int = 3, clip_duration: int = 30
) -> List[Dict]:
    """Select highlight segments based on overlap with summary words."""
    summary_words = set(summary.lower().split())
    scored = []
    for seg in segments:
        words = set(seg["text"].lower().split())
        score = len(words & summary_words)
        scored.append((score, seg))
    scored.sort(key=lambda x: x[0], reverse=True)

    highlights = []
    for score, seg in scored:
        if len(highlights) >= num_clips:
            break
        start = seg["start"]
        end = min(seg["end"], start + clip_duration)
        highlights.append({"start": start, "end": end, "text": seg["text"]})
    return highlights


def extract_clips(
    video_path: str,
    segments: List[Dict],
    output_dir: str,
    prefix: str = "clip",
    vertical: bool = False,
) -> List[Tuple[str, str]]:
    """Export highlight clips optionally cropped/resized to 9:16."""
    os.makedirs(output_dir, exist_ok=True)
    outputs = []
    with VideoFileClip(video_path) as video:
        for idx, seg in enumerate(segments):
            start = seg["start"]
            end = seg["end"]
            out_path = os.path.join(output_dir, f"{prefix}_{idx + 1}.mp4")
            subclip = video.subclip(start, end)

            if vertical:
                width, height = subclip.size
                if width / height > 9 / 16:
                    new_width = int(height * 9 / 16)
                    subclip = subclip.crop(x_center=width / 2, width=new_width)
                else:
                    new_height = int(width * 16 / 9)
                    subclip = subclip.crop(y_center=height / 2, height=new_height)
                subclip = subclip.resize(height=1080)

            subclip.write_videofile(out_path, codec="libx264", audio_codec="aac")
            outputs.append((out_path, seg["text"]))
    return outputs


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Generate highlight clips from a video using OpenAI Whisper"
    )
    parser.add_argument("video", nargs="?", help="Input video file")
    parser.add_argument("--output-dir", default="shorts", help="Directory to store clips")
    parser.add_argument("--model", default="base", help="Whisper model name or path")
    parser.add_argument("--summary-model", default="t5-small", help="Summarization model")
    parser.add_argument("--num-clips", type=int, default=3, help="Number of highlight clips")
    parser.add_argument(
        "--clip-duration", type=int, default=30, help="Length of each clip in seconds"
    )
    parser.add_argument(
        "--vertical", action="store_true", help="Export clips in vertical 9:16 aspect"
    )
    parser.add_argument(
        "--gui", action="store_true", help="Open a file chooser to select the video"
    )
    args = parser.parse_args()

    if args.gui or not args.video:
        args.video = select_video_gui()
        if not args.video:
            print("No video selected.")
            return

    segments = transcribe(args.video, args.model)
    text = " ".join(seg["text"] for seg in segments)
    summary = summarize_text(text, args.summary_model)
    title, description = generate_title_description(summary, args.summary_model)
    print("Video Title:", title)
    print("Video Description:", description, "\n")

    highlights = find_highlight_segments(
        segments, summary, args.num_clips, args.clip_duration
    )

    clips = extract_clips(
        args.video, highlights, args.output_dir, vertical=args.vertical
    )

    for path, clip_text in clips:
        c_title, c_desc = generate_title_description(clip_text, args.summary_model)
        print(f"Clip: {path}")
        print("Title:", c_title)
        print("Description:", c_desc, "\n")


if __name__ == "__main__":
    main()
