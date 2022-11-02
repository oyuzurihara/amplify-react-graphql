import React from 'react';
import './App.css';
import { dictionary } from './features/dictionary/dictionary.js';
import { I18n } from 'aws-amplify';
import { NoteIndex } from './features/View/NoteIndex.js';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Mix } from './features/Auth/Mix.js';
import { Notes } from './features/View/Notes.js';
import { Note } from './features/View/Note.js';

function App() {

  I18n.putVocabularies(dictionary);
  I18n.setLanguage("ja");

  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<Mix/>} />
          <Route path="/" element={<Notes />} >
            <Route path="/" element={<NoteIndex />} />
            <Route path=":noteId" element={<Note />} />
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
