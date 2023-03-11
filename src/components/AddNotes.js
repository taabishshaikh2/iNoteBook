import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/noteContext";

const AddNotes = () => {
  const context = useContext(NoteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", desc: "", tag: "" });
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.desc, note.tag);
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div className="container my-3">
        <h1>Add a Note</h1>
        <form className="my-3">
          <div className="mb-3 my-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              aria-describedby="emailHelp"
              name="title"
              onChange={onChange}
            />
            <div id="emailHelp" className="form-text">
              Give a title.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="desc" className="form-label">
              Description
            </label>
            <input
              type="text"
              name="desc"
              className="form-control"
              id="desc"
              onChange={onChange}
            />
          </div>
           <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              name="tag"
              className="form-control"
              id="tag"
              onChange={onChange}
            />
          </div>
          
          <button
            type="submit"
            onClick={handleClick}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNotes;
