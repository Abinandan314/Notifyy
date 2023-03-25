import React, { useState } from "react";
import EditNotes from "../EditNotes/EditNotes";
import './NotesItem.css'

function NotesItem(props) {
  const [openNote,setOpenNote] = useState(false);

  const showNoteHandler = (event) => {
    setOpenNote(true);
  }
  const hideNoteHandler = (event) => {
    setOpenNote(false);
  }
  return (
    <div>
    {openNote && <EditNotes onClose={hideNoteHandler} noteID={props.noteID}></EditNotes>}
    <li onClick={showNoteHandler}>{props.children}</li>
    </div>
  )
  
}
export default NotesItem;
