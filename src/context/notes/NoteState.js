import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Add a note
  const addNote = async (title, description, tag) => {
    // todo api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM3NzVjZjc5MzQxNDg3MTRiZjEyN2VlIn0sImlhdCI6MTY2ODg0MjcxNH0.J6mmoJD_s7VR0FV8WF46bUO8ET9HNQnOCc6VmVv2cVE",
      },

      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();
    console.log(json)

    console.log("adding a new note");
    const note = {
      _id: "637cc508d71ff8960dcc5f92",
      user: "63775cf7934148714bf127ee",
      title: title,
      description: description,
      tag: tag,
      date: "2022-11-22T12:48:08.997Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };
  // delete a note
  const deleteNote = async (id) => {
    console.log("deleting the note with id" + id);
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM3NzVjZjc5MzQxNDg3MTRiZjEyN2VlIn0sImlhdCI6MTY2ODg0MjcxNH0.J6mmoJD_s7VR0FV8WF46bUO8ET9HNQnOCc6VmVv2cVE",
      },
    });
    const json = await response.json();
    console.log(json);
    // setNotes(json);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
  
    setNotes(newNotes);
  };
  // Edit a note
  const editNotes = async (id, title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM3NzVjZjc5MzQxNDg3MTRiZjEyN2VlIn0sImlhdCI6MTY2ODg0MjcxNH0.J6mmoJD_s7VR0FV8WF46bUO8ET9HNQnOCc6VmVv2cVE",
      },

      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();
    console.log(json)
    let newNotes = JSON.parse(JSON.stringify(notes))
    // logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break
      } 
    }
    setNotes(newNotes)
  };
  // gwt all notes
  const getAllNotes = async () => {
    //  api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM3NzVjZjc5MzQxNDg3MTRiZjEyN2VlIn0sImlhdCI6MTY2ODg0MjcxNH0.J6mmoJD_s7VR0FV8WF46bUO8ET9HNQnOCc6VmVv2cVE",
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };
  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNotes, getAllNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
