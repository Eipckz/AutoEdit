import React from 'react';
import { LightBulbIcon, WandSparklesIcon } from './icons';

interface TranscriptionPaneProps {
  onStartProcessing: () => Promise<void>;
  isSimulatingLocalTranscription: boolean;
  isAnalyzingWithGemini: boolean;
  simulatedTranscript: string | null;
  apiKeyMissing: boolean;
}

export const TranscriptionPane: React.FC<TranscriptionPaneProps> = ({
  onStartProcessing,
  isSimulatingLocalTranscription,
  isAnalyzingWithGemini,
  simulatedTranscript,
  apiKeyMissing,
}) => {
  const isLoading = isSimulatingLocalTranscription || isAnalyzingWithGemini;

  return (
    <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold text-pink-400 mb-3 flex items-center">
        <WandSparklesIcon className="w-6 h-6 mr-2 text-purple-400" />
        Step 1: Local Transcription (Simulated)
      </h3>
      <p className="text-sm text-gray-400 mb-4">
        In a full application, this step would use a local AI model (like Whisper) to transcribe your video's audio into text.
        This process would run on your computer, leveraging your hardware (including GPUs if supported by the transcription tool).
      </p>
      
      <h3 className="text-xl font-semibold text-pink-400 mb-3 mt-6 flex items-center">
        <LightBulbIcon className="w-6 h-6 mr-2 text-yellow-400" />
        Step 2: AI Segment Analysis (Gemini)
      </h3>
      <p className="text-sm text-gray-400 mb-4">
        Once the transcript is (conceptually) generated, it's sent to the Gemini API to identify interesting segments suitable for clips.
      </p>

      <button
        onClick={onStartProcessing}
        disabled={isLoading || apiKeyMissing}
        className="mt-4 w-full flex items-center justify-center bg-purple-600 hover:bg-purple-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
      >
        {isSimulatingLocalTranscription ? (
          <><WandSparklesIcon className="animate-spin w-5 h-5 mr-2" />Simulating Local Transcription...</>
        ) : isAnalyzingWithGemini ? (
          <><LightBulbIcon className="animate-pulse w-5 h-5 mr-2" />Analyzing with Gemini AI...</>
        ) : (
          'Start Local Transcription & AI Analysis (Simulated)'
        )}
      </button>

      {apiKeyMissing && !isLoading && (
        <p className="text-xs text-yellow-300 bg-yellow-900 bg-opacity-50 border border-yellow-700 px-3 py-2 rounded-md mt-3 text-center">
          Gemini API Key (API_KEY) is not configured. Segment analysis will not work. Please set it up in your environment.
        </p>
      )}

      {simulatedTranscript && !isSimulatingLocalTranscription && (
        <div className="mt-6">
          <h4 className="text-md font-semibold text-gray-300 mb-2">Simulated Transcript Output:</h4>
          <div className="w-full p-3 bg-gray-800 border border-gray-600 rounded-md text-gray-200 max-h-48 overflow-y-auto text-sm">
            {simulatedTranscript}
          </div>
          <p className="text-xs text-gray-500 mt-1">This is a placeholder. Your actual local transcription tool would produce the real content.</p>
        </div>
      )}
    </div>
  );
};