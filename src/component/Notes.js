import React, { useContext, useEffect, useRef,useState } from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext'
import AddNote from './AddNote';
import Noteitem from './Noteitem';


const Notes = (props) => {
  const navigate = useNavigate();
  const context = useContext(noteContext)
    const [note,setNote] = useState({id:"",etitle:"",edescription:"",etag:"default"})
    const { notes, getNotes,editNote } = context;
  const ref = useRef(null)
  // const ref2 = useRef(null)
  useEffect(() => {
    localStorage.getItem('token') ? getNotes() : navigate('/login')
    //eslint-disable-next-line
  }, [])//we can use here notes so whenever notes changes it will run

  const updateNote = (currentNote) => {
    // console.log(note)
    ref.current.click();
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
    
    // props.showAlert('Updated Successfully','success')
  }
  
  const hadleClick = (e) => {
    e.preventDefault();
    editNote(note.id,note.etitle,note.edescription,note.etag)
    ref.current.click();
    props.showAlert('Updated successfully','success')
  }
  const onchnage = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className='my-3'>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input onChange={onchnage} type="text" className="form-control" id="etitle" value={note.etitle} name='etitle' aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input onChange={onchnage} type="text" className="form-control" name='edescription' value={note.edescription} id="edescription" />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input onChange={onchnage} type="text" className="form-control" name='etag' value={note.etag} id="etag" />
                </div>

              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5}  type="button" className="btn btn-primary" onClick={hadleClick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className='row my-3'>
        <h2>Your Note</h2>
        <div className='container mx-2'>
        {notes.length === 0 && "No notes to display!"}
          </div>
        {notes.map((note) => {
          return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
        })}
        
        
        
      </div>
    </>
  )
}

export default Notes
