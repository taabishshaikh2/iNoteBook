import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/noteContext";
import AddNotes from "./AddNotes";
import NoteItem from "./NoteItem";

const Notes = () => {
  const context = useContext(NoteContext);
  const { notes, getAllNotes, editNotes } = context;
  const [note, setNote] = useState({ etitle: "", edescription: "", teag: "" });
  useEffect(() => {
    getAllNotes();
  }, []);
  const updateNote = (currentNote) => {
    ref.current.click()
    setNote({id:currentNote._id, etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag })
  };
  const ref = useRef(null)
  const refClose = useRef(null)
  const handleClick = (e) => {
    console.log("updating the note", note);
    refClose.current.click();
editNotes(note.id, note.etitle, note.edescription, note.teag)
    // addNote(note.title, note.desc);
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <AddNotes />
      <div>
        {/* Button trigger modal */}
        <button
          type="button"
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          ref={ref}
        >
          Edit Note
        </button>
        {/* Modal */}
        <div
          className="modal fade"
          id="exampleModal"
          
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
              <form className="my-3">
          <div className="mb-3 my-3">
            <label htmlFor="etitle" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="etitle"
              aria-describedby="emailHelp"
              name="etitle"
              value={note.etitle}
              onChange={onChange}
            />
            <div id="emailHelp" className="form-text">
              Give a title.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="edescription" className="form-label">
              Description
            </label>
            <input
              type="text"
              name="edescription"
              className="form-control"
              id="edescription"
              value={note.edescription}
              onChange={onChange}
            />
          </div>
           <div className="mb-3">
            <label htmlFor="etag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              name="etag"
              className="form-control"
              id="etag"
              value={note.etag}
              onChange={onChange}
            />
          </div>
          
        
        </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  ref={refClose}
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={handleClick}>
                  Update Note
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h1>Youre Notes</h1>
        {notes.map((note) => {
          return (
            <NoteItem key={note._id} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
