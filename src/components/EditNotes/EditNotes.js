import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
// import NoteContext from "../../store/note-context";
import classes from "./EditNotes.module.css";
import NoteContext from "../../store/note-context";
import Form from "../UI/Form";

function EditNotes(props) {
  const noteCxt = useContext(NoteContext);
  const noteItemIndex = noteCxt.notes.findIndex(
    (note) => note.id === props.noteID
  );
  const noteItem = noteCxt.notes[noteItemIndex];
  const [isTitleValid,setTitleIsValid] = useState(true);
  const [isDescriptionValid,setDescriptionIsValid] = useState(true);
  const [enteredTitle, setEnteredTitle] = useState(noteItem.title);
  const [enteredNote, setEnteredNote] = useState(noteItem.description);
  const titleChangeHandler = (event) => {
    if(event.target.value.trim().length > 0){
      setTitleIsValid(true);
    }
    setEnteredTitle(event.target.value);
  };
  const noteChangeHandler = (event) => {
    if(event.target.value.trim().length > 0){
      setDescriptionIsValid(true);
    }
    setEnteredNote(event.target.value);
  };

  const addNotesHandler = (event) => {
    event.preventDefault();
    if (enteredTitle.trim().length === 0 && enteredNote.trim().length === 0){
      setTitleIsValid(false);
      setDescriptionIsValid(false);
      return;
    }
    if (enteredTitle.trim().length === 0){
      setTitleIsValid(false);
       return;
    }
    if (enteredNote.trim().length === 0){
      setDescriptionIsValid(false);
       return;
    }
    const note = {
      id: props.noteID,
      title: enteredTitle,
      description: enteredNote,
    };
    noteCxt.updateNote(note);
    setDescriptionIsValid(true);
    setTitleIsValid(true);
  };

  const onDeleteButtonHandler = (event)=>{
    noteCxt.removeNote(props.noteID);
  }
  return (
    <Modal onClose={props.onClose}>
      <div className={classes["note-items"]}>
        <Form
          addNotesHandler={addNotesHandler}
          enteredTitle={enteredTitle}
          titleChangeHandler={titleChangeHandler}
          noteChangeHandler={noteChangeHandler}
          enteredNote={enteredNote}
          buttonText="Update Note"
          validity={isTitleValid}
          desValidity={isDescriptionValid}
        ></Form>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
        <button className={classes.button} onClick={onDeleteButtonHandler}>Delete Note</button>
      </div>
      {/* <div className={classes['note-items']}>
      <div>
        <p>{noteItem.title}</p>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
        <button className={classes.button}>Done</button>
      </div>
    </div> */}
    </Modal>
  );
}
export default EditNotes;
