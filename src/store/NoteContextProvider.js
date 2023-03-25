import NoteContext from "./note-context";
import React, { useEffect, useReducer } from "react";

const defaultNoteState = {
  notes: [],
};

const getInitialNoteState = () => {
  const notes = localStorage.getItem("notes");
  return notes ? JSON.parse(notes) : defaultNoteState;
};

const noteReducer = (state, action) => {
  if (action.type === "ADD") {
    const isExisting = state.notes.findIndex(
      (note) =>
        note.title.trim().toString().toLowerCase() ===
        action.note.title.trim().toString().toLowerCase()
    );
    if (isExisting !== -1) return { notes: state.notes };
    const updatedNotes = state.notes.concat(action.note);
    return {
      notes: updatedNotes,
    };
  }
  if (action.type === "UPDATE") {
    const existingNoteIndex = state.notes.findIndex(
      (note) => note.id === action.note.id
    );
    const isExistingTitle = state.notes.findIndex(
      (note) =>
        note.title.trim().toString().toLowerCase() ===
        action.note.title.trim().toString().toLowerCase()
    );
    if (isExistingTitle !== -1 && state.notes[isExistingTitle].id !== action.note.id){
      console.log("REACHED HERE");
      return { notes: state.notes };
    } 
    const updatedNoteTitle = action.note.title;
    const updatedNoteDescription = action.note.description;
    
    state.notes[existingNoteIndex].title = updatedNoteTitle;
    state.notes[existingNoteIndex].description = updatedNoteDescription;
    
    return {
      notes: state.notes,
    };
  }
  if (action.type === "REMOVE") {
    const existingNoteIndex = state.notes.findIndex(
      (note) => note.id === action.id
    );
    console.log(state.notes[existingNoteIndex].description);
    const updatedNoteList = state.notes.filter((note) => note.id !== action.id);
    return {
      notes: updatedNoteList,
    };
  }
  return defaultNoteState;
};

function NoteContextProvider(props) {
  const [noteState, dispatchNoteAction] = useReducer(
    noteReducer,[],
    getInitialNoteState
  );

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(noteState));
  }, [noteState]);

  const addNoteToList = (note) => {
    dispatchNoteAction({ type: "ADD", note: note });
  };

  const removeNoteFromList = (id) => {
    dispatchNoteAction({ type: "REMOVE", id: id });
  };
  const updateNoteToList = (note) => {
    dispatchNoteAction({ type: "UPDATE", note: note });
  };

  const noteContext = {
    notes: noteState.notes,
    addNote: addNoteToList,
    removeNote: removeNoteFromList,
    updateNote: updateNoteToList,
  };

  return (
    <NoteContext.Provider value={noteContext}>
      {props.children}
    </NoteContext.Provider>
  );
}
export default NoteContextProvider;
