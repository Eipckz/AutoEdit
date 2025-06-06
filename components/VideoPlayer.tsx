
import React from 'react';

interface VideoPlayerProps {
  src: string | null;
  fileName?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, fileName }) => {
  if (!src) {
    return (
      <div className="aspect-video w-full bg-gray-700 rounded-lg flex items-center justify-center text-gray-500 shadow-inner">
        No video selected
      </div>
    );
  }

  return (
    <div className="w-full bg-black rounded-lg shadow-xl overflow-hidden">
      <video
        key={src} // Important to force re-render if src changes
        controls
        className="w-full aspect-video"
        preload="metadata" // Only load metadata initially
      >
        <source src={src} type={fileName ? getVideoTypeFromName(fileName) : "video/mp4"} />
        Your browser does not support the video tag. Try a different browser or video format.
      </video>
      {fileName && <p className="text-xs text-center py-1 bg-gray-800 text-gray-400 truncate px-2">Now playing: {fileName}</p>}
    </div>
  );
};

// Helper to guess video type from filename, browsers often figure it out anyway.
// MKV is a container, actual codec support varies. For display, common types work best.
const getVideoTypeFromName = (name: string): string => {
  const ext = name.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'mp4': return 'video/mp4';
    case 'webm': return 'video/webm';
    case 'ogv': return 'video/ogg';
    case 'mov': return 'video/quicktime';
    // Browsers typically don't support mkv directly in <video> tag, but we set it anyway.
    // The user's goal is local processing, not perfect browser playback of all formats.
    case 'mkv': return 'video/x-matroska'; 
    default: return 'video/mp4'; // Fallback
  }
};
