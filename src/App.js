import React from 'react';
import AddNotes from './components/Notes/AddNotes';
import NotesList from './components/Notes/NotesList';
import NoteContextProvider from './store/NoteContextProvider';

function App() {
  return (
    <NoteContextProvider>
      <AddNotes></AddNotes>
      <NotesList notes={[]}/>
      </NoteContextProvider>
  );
}

export default App;
