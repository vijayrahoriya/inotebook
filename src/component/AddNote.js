import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = () => {
    const context = useContext(noteContext)
    const {addNote} = context;
    const [note,setNote] = useState({title:"",description:"",tag:"default"})
    const hadleClick = (e) =>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag)
    }
    const onchnage = (e) =>{
        setNote({...note,[e.target.name]: e.target.value})
    }
  return (
    <div className='container my-3'>
      <h2>Add a Note</h2>
      <form className='my-3'>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input onChange={onchnage} type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input onChange={onchnage} type="text" className="form-control" name='description' id="description"/>
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" onClick={hadleClick} className="btn btn-primary">Add Note</button>
      </form>

    </div>
  )
}

export default AddNote
