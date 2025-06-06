import React from 'react';
import { LightBulbIcon, WandSparklesIcon } from './icons';

interface TranscriptionPaneProps {
  onStartProcessing: () => Promise<void>;
  isTranscribing: boolean;
  isAnalyzing: boolean;
  transcript: string | null;
}

export const TranscriptionPane: React.FC<TranscriptionPaneProps> = ({
  onStartProcessing,
  isTranscribing,
  isAnalyzing,
  transcript,
}) => {
  const isLoading = isTranscribing || isAnalyzing;

  return (
    <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold text-pink-400 mb-3 flex items-center">
        <WandSparklesIcon className="w-6 h-6 mr-2 text-purple-400" />
        Step 1: Local Transcription with Whisper
      </h3>
      <p className="text-sm text-gray-400 mb-4">
        This step uses a local Whisper model to transcribe your video's audio. It runs on your machine so no external services are required.
      </p>
      
      <h3 className="text-xl font-semibold text-pink-400 mb-3 mt-6 flex items-center">
        <LightBulbIcon className="w-6 h-6 mr-2 text-yellow-400" />
        Step 2: Segment Analysis (Local)
      </h3>
      <p className="text-sm text-gray-400 mb-4">
        After transcription completes, a local algorithm identifies interesting segments suitable for clips.
      </p>

      <button
        onClick={onStartProcessing}
        disabled={isLoading}
        className="mt-4 w-full flex items-center justify-center bg-purple-600 hover:bg-purple-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
      >
        {isTranscribing ? (
          <><WandSparklesIcon className="animate-spin w-5 h-5 mr-2" />Transcribing...</>
        ) : isAnalyzing ? (
          <><LightBulbIcon className="animate-pulse w-5 h-5 mr-2" />Analyzing Transcript...</>
        ) : (
          'Start Transcription & Analysis'
        )}
      </button>

      {transcript && !isTranscribing && (
        <div className="mt-6">
          <h4 className="text-md font-semibold text-gray-300 mb-2">Transcript Output:</h4>
          <div className="w-full p-3 bg-gray-800 border border-gray-600 rounded-md text-gray-200 max-h-48 overflow-y-auto text-sm">
            {transcript}
          </div>
          <p className="text-xs text-gray-500 mt-1">This text comes from the local Whisper transcription.</p>
        </div>
      )}
    </div>
  );
};