import type { Segment } from '../types';

// Basic local heuristic to identify up to 5 segments from a transcript.
// This function splits the transcript into sentences and groups them in
// batches to generate start/end cues and a short title.
export async function analyzeTranscriptForSegments(transcript: string): Promise<Segment[]> {
  if (!transcript) return [];

  const sentences = transcript
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(Boolean);

  const segments: Segment[] = [];
  const groupSize = 3; // number of sentences per segment

  for (let i = 0; i < sentences.length && segments.length < 5; i += groupSize) {
    const startSentence = sentences[i];
    const endSentence = sentences[Math.min(i + groupSize - 1, sentences.length - 1)];
    segments.push({
      id: `segment-${Date.now()}-${segments.length}`,
      title: startSentence.split(/\s+/).slice(0, 5).join(' ') || `Segment ${segments.length + 1}`,
      startCue: startSentence.split(/\s+/).slice(0, 5).join(' '),
      endCue: endSentence.split(/\s+/).slice(-5).join(' '),
    });
  }

  return segments;
}
