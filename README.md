# AutoEdit

AutoEdit is a command line tool that generates short-form clips from long-form videos entirely on your local machine. The application uses [faster-whisper](https://github.com/guillaumekln/faster-whisper) to transcribe video audio, applies a local summarization model to detect interesting segments, and then exports highlight clips using `moviepy`.

The script will automatically use a GPU if available. If no CUDA-enabled GPU or the necessary drivers are found, it will fall back to CPU inference, avoiding errors related to missing CUDA libraries.

## Requirements

- Python 3.8+
- `ffmpeg` installed and available on your `PATH`
- Python packages listed in `requirements.txt` (includes `faster-whisper`)

Install dependencies with:

```bash
pip install -r requirements.txt
```

## Usage

Run the script with a video file:

```bash
python autoedit.py path/to/video.mp4 --output-dir shorts
# use --vertical to export 9:16 clips
python autoedit.py path/to/video.mp4 --output-dir shorts --vertical
```

Or open a file chooser window so you don't have to type the path:

```bash
python autoedit.py --gui --output-dir shorts
```

This will:

1. Transcribe the video locally with faster-whisper.
2. Summarize the transcript to identify highlight segments.
3. Export short clips into the `shorts` directory.
4. Generate a short title and multi-sentence description for each clip using the summarization model.

### Options

- `--model` – Whisper model name or path (default `base`).
- `--summary-model` – summarization model (default `t5-small`).
- `--num-clips` – number of highlight clips to produce (default `3`).
- `--clip-duration` – length of each highlight in seconds (default `30`).
- `--vertical` – export clips cropped/resized to 9:16 vertical aspect.
- `--gui` – open a file chooser to select the input video.

## Notes

The summarization and transcription models are loaded locally, so large model files may be downloaded beforehand. Ensure you have enough disk space and GPU/CPU resources for processing.
When clips are generated, their titles and descriptions are printed to the console so you can easily reuse them.
If you enable `--vertical`, the exported clips will be cropped or resized to a 9:16 aspect ratio.

