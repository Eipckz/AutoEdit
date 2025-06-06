
import React from 'react';
import type { Segment } from '../types';
import { PlayIcon } from './icons';

interface SuggestedSegmentItemProps {
  segment: Segment;
  onSelect: (segment: Segment) => void;
}

export const SuggestedSegmentItem: React.FC<SuggestedSegmentItemProps> = ({ segment, onSelect }) => {
  return (
    <div className="bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-600 hover:border-purple-500">
      <h4 className="text-lg font-semibold text-purple-300">{segment.title}</h4>
      <p className="text-sm text-gray-400 mt-1">
        <strong>Starts around:</strong> "{segment.startCue}"
      </p>
      <p className="text-sm text-gray-400 mt-1">
        <strong>Ends around:</strong> "{segment.endCue}"
      </p>
      <button
        onClick={() => onSelect(segment)}
        className="mt-3 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md text-sm transition duration-150 ease-in-out flex items-center"
      >
        <PlayIcon className="w-4 h-4 mr-2" />
        Configure as Clip
      </button>
    </div>
  );
};
