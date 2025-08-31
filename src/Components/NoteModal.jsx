// src/Components/NoteModal.jsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeNoteModal } from '../features/ui/uiSlice';
import { saveNote, deleteNote } from '../features/notes/notesSlice';
import { CloseIcon } from './icons';

const NoteModal = () => {
  const dispatch = useDispatch();
  const { isNoteModalOpen, currentProblemForNote } = useSelector((state) => state.ui);
  const allNotes = useSelector((state) => state.notes.notes);
  
  const [noteContent, setNoteContent] = useState('');

  // When the modal opens, load the existing note (if any) into the textarea
  useEffect(() => {
    if (currentProblemForNote) {
      const existingNote = allNotes[currentProblemForNote.problemId] || '';
      setNoteContent(existingNote);
    }
  }, [currentProblemForNote, allNotes]);

  if (!isNoteModalOpen || !currentProblemForNote) {
    return null;
  }
  
  const handleSave = () => {
    dispatch(saveNote({ problemId: currentProblemForNote.problemId, content: noteContent }));
    dispatch(closeNoteModal());
  };

  const handleDelete = () => {
    dispatch(deleteNote({ problemId: currentProblemForNote.problemId }));
    dispatch(closeNoteModal());
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => dispatch(closeNoteModal())}>
      <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-2xl w-full max-w-2xl mx-auto p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold text-white">Note for:</h2>
            <p className="text-indigo-300">{currentProblemForNote.problemName}</p>
          </div>
          <button onClick={() => dispatch(closeNoteModal())} className="p-2 rounded-full hover:bg-gray-700">
            <CloseIcon className="h-6 w-6 text-gray-400" />
          </button>
        </div>

        <textarea
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          placeholder="Write your thoughts, approach, or solution here..."
          className="w-full h-64 bg-gray-900 border border-gray-600 rounded-lg p-4 text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition resize-none"
        ></textarea>

        <div className="flex justify-end items-center mt-4 space-x-3">
          <button onClick={handleDelete} className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-300 hover:bg-red-800/50 hover:text-red-300 transition-colors">
            Delete Note
          </button>
          <button onClick={handleSave} className="px-6 py-2 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;