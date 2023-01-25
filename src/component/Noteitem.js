import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const Noteitem = (props) => {
    const context = useContext(noteContext)
    const {deleteNote}  = context;
    const {note,updateNote} = props;
    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <div className='d-flex align-items-center justify-content-between'>
                    <h5 className="card-title">{note.title}</h5>
                    <div className='icons'>
                    <i className="fa-regular fa-pen-to-square mx-3" onClick={()=>{updateNote(note);}}></i>
                    <i className="fa-regular fa-trash-can" onClick={()=>{
                        deleteNote(note._id);
                        props.showAlert("Deleted Successfully","success")
                    }}></i>
                    </div>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default Noteitem
