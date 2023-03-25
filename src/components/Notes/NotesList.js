import React, { useContext } from "react";
import NoteContext from "../../store/note-context";
import Card from "../UI/Card";
import NotesItem from "./NotesItem";
import classes from "./NotesList.module.css";

const NotesList = () => {
  const noteCxt = useContext(NoteContext);
  return (
    <Card className={classes.notes}>
      <ul>
        {noteCxt.notes.map((note) => (
          <NotesItem key={note.id} noteID={note.id}>
            <div className={classes.heading}>{note.title}</div>
            <div className={classes.heading1}>{note.description}</div>
          </NotesItem>
        ))}
      </ul>
    </Card>
  );
};

export default NotesList;
