import React from 'react';
import type { Clip, AspectRatio } from '../types';

interface ClipConfigurationPaneProps {
  clipConfig: Clip;
  updateClipConfig: (updater: (prevConfig: Clip | null) => Clip | null) => void;
}

const aspectRatios: { value: AspectRatio; label: string }[] = [
  { value: '9:16', label: '9:16 (Portrait - TikTok, Shorts)' },
  { value: '16:9', label: '16:9 (Landscape - YouTube)' },
  { value: '1:1', label: '1:1 (Square - Instagram)' },
  { value: '4:3', label: '4:3 (Classic)' },
];

export const ClipConfigurationPane: React.FC<ClipConfigurationPaneProps> = ({ clipConfig, updateClipConfig }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let processedValue: string | number | boolean = value;

    if (type === 'number') {
      processedValue = parseFloat(value);
    } else if (type === 'checkbox') {
      processedValue = (e.target as HTMLInputElement).checked;
    }
    
    updateClipConfig(prev => prev ? ({ ...prev, [name]: processedValue }) : null);
  };

  return (
    <div className="space-y-6 bg-gray-700 p-6 rounded-lg shadow-lg">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">Clip Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={clipConfig.title}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md text-gray-200 focus:ring-1 focus:ring-pink-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="startTimeSeconds" className="block text-sm font-medium text-gray-300 mb-1">Start Time (seconds in original video)</label>
          <input
            type="number"
            name="startTimeSeconds"
            id="startTimeSeconds"
            value={clipConfig.startTimeSeconds}
            onChange={handleChange}
            min="0"
            step="0.1"
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md text-gray-200 focus:ring-1 focus:ring-pink-500"
            placeholder="e.g., 0"
          />
           <p className="text-xs text-gray-400 mt-1">Use video player to find exact time. Based on AI cue: <em className="text-purple-300">"{clipConfig.startCue}"</em></p>
        </div>
        <div>
          <label htmlFor="endTimeSeconds" className="block text-sm font-medium text-gray-300 mb-1">End Time (seconds in original video)</label>
          <input
            type="number"
            name="endTimeSeconds"
            id="endTimeSeconds"
            value={clipConfig.endTimeSeconds}
            onChange={handleChange}
            min={clipConfig.startTimeSeconds + 0.1}
            step="0.1"
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md text-gray-200 focus:ring-1 focus:ring-pink-500"
            placeholder="e.g., 15"
          />
           <p className="text-xs text-gray-400 mt-1">Must be after start time. Based on AI cue: <em className="text-purple-300">"{clipConfig.endCue}"</em></p>
        </div>
      </div>
      
      <div>
        <label htmlFor="aspectRatio" className="block text-sm font-medium text-gray-300 mb-1">Aspect Ratio for Clip</label>
        <select
          name="aspectRatio"
          id="aspectRatio"
          value={clipConfig.aspectRatio}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md text-gray-200 focus:ring-1 focus:ring-pink-500"
        >
          {aspectRatios.map(ar => (
            <option key={ar.value} value={ar.value}>{ar.label}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          name="autoFrame"
          id="autoFrame"
          checked={clipConfig.autoFrame}
          onChange={handleChange}
          className="h-4 w-4 text-purple-600 border-gray-500 rounded focus:ring-purple-500"
        />
        <label htmlFor="autoFrame" className="ml-2 block text-sm text-gray-300">
          Enable Auto-framing (Conceptual for Local Tools)
        </label>
      </div>
      <p className="text-xs text-gray-400">
        If enabled, your local video processing tool (e.g., FFmpeg with smart cropping scripts, or a dedicated AI tool) would attempt to dynamically keep the main subject in frame. This is especially useful when changing aspect ratios (e.g., landscape to portrait) and can be GPU-accelerated by some local tools.
      </p>
    </div>
  );
};