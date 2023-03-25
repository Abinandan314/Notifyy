import React, { Fragment, useContext, useState } from "react";
import NoteContext from "../../store/note-context";
import Form from "../UI/Form";
// import ErrorModal from "../UI/ErrorModal";


function AddNotes() {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [isTitleValid,setTitleIsValid] = useState(true);
  const [isDescriptionValid,setDescriptionIsValid] = useState(true);
  const [enteredNote, setEnteredNote] = useState("");
  const noteCxt = useContext(NoteContext);
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
      id: Math.random().toString(),
      title: enteredTitle,
      description: enteredNote,
    };
    console.log(enteredTitle, enteredNote);
    setDescriptionIsValid(true);
    setTitleIsValid(true);
    noteCxt.addNote(note);
    setEnteredNote("");
    setEnteredTitle("");
  };
  return (
      <Fragment>
        {/* <ErrorModal title="Form Data Invalid" message ="Please check your description"></ErrorModal> */}
      <Form
        addNotesHandler={addNotesHandler}
        enteredTitle={enteredTitle}
        titleChangeHandler={titleChangeHandler}
        noteChangeHandler={noteChangeHandler}
        enteredNote={enteredNote}
        buttonText="Add New Note"
        validity={isTitleValid}
        desValidity = {isDescriptionValid}
      ></Form>
      
      </Fragment>
      /* <form onSubmit={addNotesHandler}>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" value={enteredTitle} onChange={titleChangeHandler}></input>
        <label htmlFor="description">Type your text here</label>
        <textarea
          id="description"
          rows="4"
          cols="50"
          onChange={noteChangeHandler}
          value={enteredNote}
        ></textarea>
        <Button type="submit">Add New Note</Button>
      </form> */
  );
}
export default AddNotes;
