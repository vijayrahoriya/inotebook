import { useState } from 'react'
import NoteContext from './noteContext'

const NoteState = (props) =>{
    // const s1 = {
    //     "name":'vijay',
    //     "class":5
    // }
    // const [state,setState] = useState(s1)
    // const update = () =>{
    //     setTimeout(() => {
    //         setState({
    //             "name":"rohit",
    //             "class":8
    //         })
    //     }, 1000);
    // }
    const notesdata = [
        {
          "_id": "63c616afa096esa66579874e68",
          "user": "63c13bf327eaf1cd0f835a33",
          "title": "my title",
          "description": "this is my desc",
          "tag": "personal",
          "date": "2023-01-17T03:31:59.213Z",
          "__v": 0
        },
        {
          "_id": "63c616afa0sagd96e66579874e68",
          "user": "63c13bf327eaf1cd0f835a33",
          "title": "my title",
          "description": "this is my desc",
          "tag": "personal",
          "date": "2023-01-17T03:31:59.213Z",
          "__v": 0
        },
        {
          "_id": "63c616afa0sg96e66579874e68",
          "user": "63c13bf327eaf1cd0f835a33",
          "title": "my title",
          "description": "this is my desc",
          "tag": "personal",
          "date": "2023-01-17T03:31:59.213Z",
          "__v": 0
        },
        {
          "_id": "63c616afa0sdg96e66579874e68",
          "user": "63c13bf327eaf1cd0f835a33",
          "title": "my title",
          "description": "this is my desc",
          "tag": "personal",
          "date": "2023-01-17T03:31:59.213Z",
          "__v": 0
        },
        {
          "_id": "63c616afa096easdg66579874e68",
          "user": "63c13bf327eaf1cd0f835a33",
          "title": "my title",
          "description": "this is my desc",
          "tag": "personal",
          "date": "2023-01-17T03:31:59.213Z",
          "__v": 0
        },
        {
          "_id": "63c616sdafa096de66579874e68",
          "user": "63c13bf327eaf1cd0f835a33",
          "title": "my title",
          "description": "this is my desc",
          "tag": "personal",
          "date": "2023-01-17T03:31:59.213Z",
          "__v": 0
        },
        {
          "_id": "63c616afsda096e66579874e68",
          "user": "63c13bf327eaf1cd0f835a33",
          "title": "my title",
          "description": "this is my desc",
          "tag": "personal",
          "date": "2023-01-17T03:31:59.213Z",
          "__v": 0
        },
        {
          "_id": "63c616asdafa096e66579874e68",
          "user": "63c13bf327eaf1cd0f835a33",
          "title": "my title",
          "description": "this is my desc",
          "tag": "personal",
          "date": "2023-01-17T03:31:59.213Z",
          "__v": 0
        },
      ]
      const [notes , setNotes] = useState(notesdata)

      const addNote = (title,description,tag)=>{
        let note ={
          "_id": "63c616asdafa096esg66579874e68",
          "user": "63c13bf327eaf1cd0f835a33sg",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2023-01-17T03:31:59.213Z",
          "__v": 0
        }

        setNotes(notes.concat(note))
      }

      const deleteNote = (id)=>{
        const newNotes = notes.filter((note)=> {return note._id !== id})
        setNotes(newNotes)
      }

      const editNote = ()=>{

      }
    return(
        // <NoteContext.Provider value={{state:state,update:update}}> same as below
            // <NoteContext.Provider value={{state,update}}>
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;