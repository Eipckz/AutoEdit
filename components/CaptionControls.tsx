
import React, { useState } from 'react';
import type { Caption, CaptionStyle } from '../types';
import { PlusIcon, TrashIcon, EditIcon } from './icons';

interface CaptionControlsProps {
  captions: Caption[];
  onAddCaption: (text: string) => void;
  onUpdateCaption: (id: string, updatedCaption: Caption) => void;
  onRemoveCaption: (id: string) => void;
  clipDuration: number;
}

const fonts = ['Arial', 'Verdana', 'Helvetica', 'Impact', 'Comic Sans MS']; // Example fonts
const positions: CaptionStyle['position'][] = ['bottom', 'middle', 'top'];

export const CaptionControls: React.FC<CaptionControlsProps> = ({
  captions,
  onAddCaption,
  onUpdateCaption,
  onRemoveCaption,
  clipDuration
}) => {
  const [newCaptionText, setNewCaptionText] = useState('');
  const [editingCaption, setEditingCaption] = useState<Caption | null>(null);

  const handleAddCaption = () => {
    if (newCaptionText.trim()) {
      onAddCaption(newCaptionText.trim());
      setNewCaptionText('');
    }
  };

  const handleEditCaption = (caption: Caption) => {
    setEditingCaption(JSON.parse(JSON.stringify(caption))); // Deep copy for editing
  };

  const handleSaveEdit = () => {
    if (editingCaption) {
      onUpdateCaption(editingCaption.id, editingCaption);
      setEditingCaption(null);
    }
  };
  
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!editingCaption) return;
    const { name, value, type } = e.target;
    let processedValue: string | number = value;
    if (type === 'number') processedValue = parseFloat(value);
    
    if (name.startsWith('style.')) {
        const styleField = name.split('.')[1] as keyof CaptionStyle;
        setEditingCaption({
            ...editingCaption,
            style: {
                ...editingCaption.style,
                [styleField]: processedValue
            }
        });
    } else {
        setEditingCaption({ ...editingCaption, [name]: processedValue });
    }
  };


  return (
    <div className="space-y-4 bg-gray-700 p-6 rounded-lg shadow-lg">
      <div className="flex space-x-2">
        <input
          type="text"
          value={newCaptionText}
          onChange={(e) => setNewCaptionText(e.target.value)}
          placeholder="Enter caption text"
          className="flex-grow p-2 bg-gray-800 border border-gray-600 rounded-md text-gray-200 focus:ring-1 focus:ring-pink-500"
        />
        <button
          onClick={handleAddCaption}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md flex items-center transition-colors"
        >
          <PlusIcon className="w-5 h-5 mr-1" /> Add
        </button>
      </div>

      {captions.length === 0 && <p className="text-sm text-gray-400 text-center py-2">No captions added yet.</p>}

      {captions.map((caption) => (
        <div key={caption.id} className="bg-gray-800 p-3 rounded-md border border-gray-600">
          {editingCaption?.id === caption.id ? (
            <div className="space-y-3">
              <input type="text" name="text" value={editingCaption.text} onChange={handleEditChange} className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-gray-200" />
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                    <label className="block text-xs text-gray-400">Start (s)</label>
                    <input type="number" name="startTime" value={editingCaption.style.size > 0 ? editingCaption.startTime : 0} onChange={handleEditChange} step="0.1" min="0" max={clipDuration} className="w-full p-1 bg-gray-900 border border-gray-700 rounded text-gray-200" />
                </div>
                <div>
                    <label className="block text-xs text-gray-400">End (s)</label>
                    <input type="number" name="endTime" value={editingCaption.style.size > 0 ? editingCaption.endTime : 0} onChange={handleEditChange} step="0.1" min={editingCaption.startTime} max={clipDuration} className="w-full p-1 bg-gray-900 border border-gray-700 rounded text-gray-200" />
                </div>
                <div>
                    <label className="block text-xs text-gray-400">Font Size (px)</label>
                    <input type="number" name="style.size" value={editingCaption.style.size} onChange={handleEditChange} className="w-full p-1 bg-gray-900 border border-gray-700 rounded text-gray-200" />
                </div>
                <div>
                    <label className="block text-xs text-gray-400">Font Color</label>
                    <input type="color" name="style.color" value={editingCaption.style.color} onChange={handleEditChange} className="w-full h-8 p-0 bg-gray-900 border border-gray-700 rounded" />
                </div>
                <div>
                    <label className="block text-xs text-gray-400">Background Color</label>
                    <input type="color" name="style.backgroundColor" value={editingCaption.style.backgroundColor || '#000000'} onChange={handleEditChange} className="w-full h-8 p-0 bg-gray-900 border border-gray-700 rounded" />
                    <span className="text-xs text-gray-500"> (Set alpha in hex, e.g. #00000080 for 50% transparent black)</span>
                </div>
                 <div>
                    <label className="block text-xs text-gray-400">Font Family</label>
                    <select name="style.font" value={editingCaption.style.font} onChange={handleEditChange} className="w-full p-1 bg-gray-900 border border-gray-700 rounded text-gray-200">
                        {fonts.map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-xs text-gray-400">Position</label>
                    <select name="style.position" value={editingCaption.style.position} onChange={handleEditChange} className="w-full p-1 bg-gray-900 border border-gray-700 rounded text-gray-200">
                        {positions.map(p => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
                    </select>
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-2">
                <button onClick={handleSaveEdit} className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-3 rounded">Save</button>
                <button onClick={() => setEditingCaption(null)} className="bg-gray-600 hover:bg-gray-500 text-white text-sm py-1 px-3 rounded">Cancel</button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <p className="text-gray-300 text-sm flex-grow mr-2 truncate" title={caption.text}>{caption.text}</p>
              <div className="flex-shrink-0 space-x-2">
                <button onClick={() => handleEditCaption(caption)} className="text-blue-400 hover:text-blue-300 p-1"><EditIcon className="w-4 h-4"/></button>
                <button onClick={() => onRemoveCaption(caption.id)} className="text-red-400 hover:text-red-300 p-1"><TrashIcon className="w-4 h-4"/></button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
