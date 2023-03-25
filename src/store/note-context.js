import React from "react";

const NoteContext = React.createContext({
    notes:[],
    addNote: ()=>{},
    removeNote:()=>{},
    updateNote:()=>{}
});

export default NoteContext;