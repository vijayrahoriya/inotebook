import { useState } from 'react'
import NoteContext from './noteContext'

const NoteState = (props) => {
  const host = 'http://localhost:5000'
  const notesdata = []
  const [notes, setNotes] = useState(notesdata)

  const getNotes = async()=>{
    const response = await fetch(`${host}/api/notes/fetchallnotes`,{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'auth-token':localStorage.getItem('token')
      },
    })
    const json = await response.json();
    // console.log(json)
    setNotes(json)
  }

  const addNote = async(title, description, tag) => {
    const response =await fetch(`${host}/api/notes/addnote`,{
      method:'POST',
      body:JSON.stringify({title,description,tag}),
      headers:{
        'Content-Type':'application/json',
        'auth-token':localStorage.getItem('token')
      },
    })
     let note =  await response.json()
    setNotes(notes.concat(note))
  }

  const deleteNote = async(id) => {
    const response =await fetch(`${host}/api/notes/deletenote/${id}`,{
      method:'DELETE',
      headers:{
        'Content-Type':'application/json',
        'auth-token':localStorage.getItem('token')
      },
    })
    await response.json()
    const newNotes = notes.filter((note)=>{return note._id !== id})
    setNotes(newNotes)
  }

  //edit a note
  const editNote = async (id,title,description,tag) => {
    const response =await fetch(`${host}/api/notes/updatenote/${id}`,{
      method:'PUT',
      body:JSON.stringify({title,description,tag}),
      headers:{
        'Content-Type':'application/json',
        'auth-token':localStorage.getItem('token')
      },
    })
    await response.json()

    let newNotes = JSON.parse(JSON.stringify(notes))

    for(let i = 0; i<newNotes.length;i++){
      const element = newNotes[i];
      // console.log(element)
      if(element._id === id){
        // console.log(title,description,tag)
        newNotes[i].title = title
        newNotes[i].description = description
        newNotes[i].tag = tag
        break;
      }
    }
    setNotes(newNotes)
  }
  return (
    // <NoteContext.Provider value={{state:state,update:update}}> same as below
    // <NoteContext.Provider value={{state,update}}>
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;