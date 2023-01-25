import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {
    const context = useContext(noteContext)
    const {addNote} = context;
    const [note,setNote] = useState({title:"",description:"",tag:""})
    const hadleClick = (e) =>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag)
        setNote({title:"",description:"",tag:""})
        props.showAlert('Added Successfully','success')
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
          <input value={note.title} onChange={onchnage} type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input value={note.description} onChange={onchnage} type="text" className="form-control" name='description' id="description"/>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input value={note.tag} onChange={onchnage} type="text" className="form-control" name='tag' id="tag"/>
        </div>
        
        <button disabled={note.title.length<5 || note.description.length<5} type="submit" onClick={hadleClick} className="btn btn-primary">Add Note</button>
      </form>

    </div>
  )
}

export default AddNote
