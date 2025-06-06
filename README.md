# AutoEdit

AutoEdit is a command line tool that generates short-form clips from long-form videos entirely on your local machine. The application uses [WhisperX](https://github.com/m-bain/whisperx) to transcribe video audio, applies a local summarization model to detect interesting segments, and then exports highlight clips using `moviepy`.

## Requirements

- Python 3.8+
- `ffmpeg` installed and available on your `PATH`
- Python packages listed in `requirements.txt`

Install dependencies with:

```bash
pip install -r requirements.txt
```

## Usage

Run the script with a video file:

```bash
python autoedit.py path/to/video.mp4 --output-dir shorts
```

This will:

1. Transcribe the video locally with WhisperX.
2. Summarize the transcript to identify highlight segments.
3. Export short clips into the `shorts` directory.
4. Generate a short title and multi-sentence description for each clip using the summarization model.

### Options

- `--model` – Whisper model name or path (default `base`).
- `--summary-model` – summarization model (default `t5-small`).
- `--num-clips` – number of highlight clips to produce (default `3`).
- `--clip-duration` – length of each highlight in seconds (default `30`).

## Notes

The summarization and transcription models are loaded locally, so large model files may be downloaded beforehand. Ensure you have enough disk space and GPU/CPU resources for processing.
When clips are generated, their titles and descriptions are printed to the console so you can easily reuse them.
