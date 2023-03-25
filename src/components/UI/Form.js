import React from "react";
import Button from "./Button";
import Card from "./Card";
import classes from './Form.module.css'

function Form(props) {
  let errorContent = <p></p>;
  if(!props.validity && !props.desValidity){
    errorContent = <p className={classes.p}>Both fields are invalid</p>;
  }
  else if(!props.validity){
    errorContent = <p className={classes.p}>Title already exists or empty</p>;
  }
  else if(!props.desValidity){
    errorContent = <p className={classes.p}>Please add description</p>
  }
  return (
    <Card className={classes.input}>
    <form onSubmit={props.addNotesHandler}>
      <label htmlFor="title" style={{color : !props.validity ? 'red' : ''}}>Title</label>
      <input
        id="title"
        type="text"
        value={props.enteredTitle}
        onChange={props.titleChangeHandler}
        style={{borderColor : !props.validity ? 'salmon' : ''}}
      ></input>
      <label htmlFor="description" style={{color : !props.desValidity ? 'red' : ''}}>Type your notes here</label>
      <textarea
        id="description"
        rows="4"
        cols="50"
        onChange={props.noteChangeHandler}
        value={props.enteredNote}
        style={{borderColor : !props.desValidity ? 'salmon' : ''}}
      ></textarea>
      <Button type="submit">{props.buttonText}</Button>
    </form>
    {errorContent}
    </Card>
  );
}
export default Form;
