import sys
from faster_whisper import WhisperModel


def main():
    if len(sys.argv) < 2:
        print('Usage: transcribe.py <video_path>', file=sys.stderr)
        return 1
    video_path = sys.argv[1]
    model = WhisperModel('base')
    segments, _ = model.transcribe(video_path)
    text = ' '.join(seg.text for seg in segments)
    print(text)
    return 0


if __name__ == '__main__':
    sys.exit(main())
