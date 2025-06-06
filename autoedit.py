import argparse
import os

import whisperx
from transformers import pipeline
from moviepy.video.io.VideoFileClip import VideoFileClip


def transcribe(video_path: str, model_name: str = "base"):
    """Transcribe a video using WhisperX."""
    device = "cpu"
    model = whisperx.load_model(model_name, device)
    result = model.transcribe(video_path)
    return result["segments"]


def summarize_text(text: str, model_name: str = "t5-small") -> str:
    """Summarize text using a transformers pipeline."""
    summarizer = pipeline("summarization", model=model_name)
    summary = summarizer(text, max_length=60, min_length=20)[0]["summary_text"]
    return summary


def find_highlight_segments(segments, summary: str, num_clips: int = 3, clip_duration: int = 30):
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
        highlights.append((start, end))
    return highlights


def extract_clips(
    video_path: str,
    segments,
    output_dir: str,
    prefix: str = "clip",
    aspect: str = "original",
    vertical: bool = False,
):
    """Export highlight clips optionally cropped/resized to 9:16."""

    os.makedirs(output_dir, exist_ok=True)
    with VideoFileClip(video_path) as video:
        for idx, (start, end) in enumerate(segments):
            out_path = os.path.join(output_dir, f"{prefix}_{idx + 1}.mp4")
            subclip = video.subclip(start, end)

            if vertical or aspect == "9:16":
                width, height = subclip.size
                if width / height > 9 / 16:
                    new_width = int(height * 9 / 16)
                    subclip = subclip.crop(x_center=width / 2, width=new_width)
                else:
                    new_height = int(width * 16 / 9)
                    subclip = subclip.crop(y_center=height / 2, height=new_height)
                subclip = subclip.resize(height=1080)

            subclip.write_videofile(out_path, codec="libx264", audio_codec="aac")


def main():
    parser = argparse.ArgumentParser(description="Generate highlight clips from a video using WhisperX")
    parser.add_argument("video", help="Input video file")
    parser.add_argument("--output-dir", default="shorts", help="Directory to store clips")
    parser.add_argument("--model", default="base", help="Whisper model name or path")
    parser.add_argument("--summary-model", default="t5-small", help="Summarization model")
    parser.add_argument("--num-clips", type=int, default=3, help="Number of highlight clips")
    parser.add_argument("--clip-duration", type=int, default=30, help="Length of each clip in seconds")
    parser.add_argument("--vertical", action="store_true", help="Export clips in vertical 9:16 aspect")
    args = parser.parse_args()

    segments = transcribe(args.video, args.model)
    text = " ".join(seg["text"] for seg in segments)
    summary = summarize_text(text, args.summary_model)
    highlights = find_highlight_segments(segments, summary, args.num_clips, args.clip_duration)
    extract_clips(args.video, highlights, args.output_dir, vertical=args.vertical)


if __name__ == "__main__":
    main()
