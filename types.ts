export interface Segment {
  id: string;
  title: string;
  startCue: string;
  endCue: string;
  // startTime and endTime would be derived by user aligning cues with video player
}

export type AspectRatio = '9:16' | '16:9' | '1:1' | '4:3';

export interface Clip extends Segment {
  startTimeSeconds: number; // User defined, based on video player
  endTimeSeconds: number;   // User defined, based on video player
  autoFrame: boolean;
  aspectRatio: AspectRatio;
  captions: Caption[];
}

export interface Caption {
  id:string;
  text: string;
  startTime: number; // Relative to clip start in seconds
  endTime: number;   // Relative to clip start in seconds
  style: CaptionStyle;
}

export interface CaptionStyle {
  font: string;
  size: number; // px
  color: string; // hex
  position: 'bottom' | 'middle' | 'top';
  backgroundColor?: string; // hex, includes alpha e.g. #00000080
  outlineColor?: string; // hex
}

export enum AppStep {
  Upload,
  GenerateTranscript, // Changed from Transcribe
  SelectSegment,
  ConfigureClip,
}

// Structures for potential grounding information returned by AI models
export interface GroundingChunkWeb {
  uri?: string;
  title?: string;
}
export interface GroundingChunkRetrievedContext {
   uri?: string;
   title?: string;
}
export interface GroundingChunk {
  web?: GroundingChunkWeb;
  retrievedContext?: GroundingChunkRetrievedContext;
  // Other potential grounding chunk types can be added here
}

// For parsing structured segment suggestions
export interface RawSegmentSuggestion {
  title: string;
  startCue: string;
  endCue: string;
}