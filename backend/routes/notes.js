const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');
const { findByIdAndUpdate } = require('../models/Notes');

router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Some error caught')
    }
})

router.post('/addnote', fetchUser, [
    body('title', 'please enter a valid title').isLength({ min: 3 }),
    body('description', 'please enter a valid description').isLength({ min: 5 })
], async (req, res) => {
    try {
    //if there is error ,return bad request 
    const {title,description,tag} = req.body;
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() })
    }

    const note = new Notes({
        title, description, tag, user: req.user.id
    })   

    const savedNote = await note.save();
    res.json(savedNote)

    }  catch (err) {
        console.error(err.message)
        res.status(500).send('Some error caught')
    }
})

router.put('/updatenote/:id',fetchUser,async (req,res)=>{
    try{
    const {title,description,tag} = req.body;
    const newNote = {};
    if(title){
        newNote.title = title
    }
    if(description){
        newNote.description = description
    }
    if(tag){
        newNote.tag = tag
    }
    // fint the note and updated 
    let note = await Notes.findById(req.params.id);
    if(!note){return res.status(404).send('Not Found')}
    
    if(note.user.toString() !== req.user.id){return res.status(401).send('Not Allowed')}

    note = await Notes.findByIdAndUpdate(req.params.id ,{$set: newNote},{new: true})
    res.json({note})
}
    catch (err) {
        console.error(err.message)
        res.status(500).send('Some error caught')
    }
})

router.delete('/deletenote/:id',fetchUser,async(req,res)=>{
    let note = await Notes.findById(req.params.id);
    if(!note){return res.status(404).send('Not Found')}

    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
    }

    note = await Notes.findByIdAndDelete(req.params.id)
    res.json('Succes Not has been delete')
})

module.exports = router;