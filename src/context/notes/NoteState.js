import { useState } from 'react'
import NoteContext from './noteContext'

const NoteState = (props) =>{
    const s1 = {
        "name":'vijay',
        "class":5
    }
    const [state,setState] = useState(s1)
    const update = () =>{
        setTimeout(() => {
            setState({
                "name":"rohit",
                "class":8
            })
        }, 1000);
    }
    return(
        // <NoteContext.Provider value={{state:state,update:update}}> same as below
        <NoteContext.Provider value={{state,update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;