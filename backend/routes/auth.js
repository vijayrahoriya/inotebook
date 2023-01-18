const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');//for protacting our password install bcrypt from npm package
const jwt = require('jsonwebtoken')
const { default: mongoose } = require('mongoose');
const fetchUser = require('../middleware/fetchuser')

const JWT_SECRET = 'Thisisvijay@83020'

router.post('/createuser', [
    body('name', 'please enter a valid name').isLength({ min: 3 }),
    body('email', 'please enter a valid email').isEmail(),
    body('password').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {

        let user = await User.findOne({ email: req.body.email }); //checking email exist or not
        if (user) {
            return res.status(404).json({ error: "Sorry this email is exist" })
        }
        const salt =await bcrypt.genSalt(10);//creating salt
        setPass = await bcrypt.hash(req.body.password,salt);//gentrating hash
        user = await User.create({
            name: req.body.name,
            password: setPass,
            email: req.body.email
        })
        const data = {
            user:{
                id:user.id
            }
        }
        const authToken = jwt.sign(data,JWT_SECRET);
        res.json({authToken})

        // res.json({ "success": "successful" })
        
        // .then(user => res.json(user)).catch((err)=> {
        //     console.log(err)
        //     res.json({error: 'Please enter unique email'})
        // })
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Some error caught')
    }
})

//authenticat a user
router.post('/login', [
    body('email', 'please enter a valid email').isEmail(),
    body('password','password can not be blanked').exists(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try{
        let {email,password} = req.body
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error:"Please try to login with correct information"})
        }
        const passwordCompare = await bcrypt.compare(password,user.password)
        if(!passwordCompare){
            return res.status(400).json({error:'please try to login with corrent information'})
        }
        const data = {
            user:{
                id: user.id
            }
        }

        const authToken = await jwt.sign(data,JWT_SECRET);
        res.json(authToken)
    }catch (err) {
        console.error(err.message)
        res.status(500).send('Some Internal error')
    }
})

router.post('/getuser',fetchUser,async(req,res)=>{
    try{
        let userId = req.user.id;
        const user = await User.findById(userId)//for removing password from the get data
        // console.log(userId)
        res.send(user)
    }catch (err) {
        // console.error(err.message)
        res.status(500).send('Some Internal error')
    }
})

module.exports = router;