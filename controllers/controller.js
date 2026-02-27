import express from 'express';
import Note from '../models/notes.js';

const router = express.Router();

// GET All
router.get('/', (req, res) => {
    Note.find()       //for mongooose, use Note.find() not Product.findAll()
    .then(notes => {
        res.json(notes)
    })
    .catch(err => {
        res.json(err)
    })
})  

// GET By ID
router.get('/:id', (req, res) => {
    Note.findById(req.params.id)    //for mongoose,
    .then(note => {
        res.json(note)
    })
    .catch(err => {
        res.json(err)
    })
})

// POST

router.post('/', (req, res) => {
    let { title, content, author } = req.body;
    
    if (!title || !content || !author) {
        return res.status(400).json({ error: 'Title, content, and author are required' });
    }

    Note.create({ title, content, author })
        .then(data => {res.status(201).json(data)})
        .catch(err => {res.status(500).json({ error: err.message })})       
})

// PUT
    router.put('/:id', (req, res) => { 
        let { title, content, author } = req.body

        if (!title || !content || !author) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        Note.findByIdAndUpdate(req.params.id, { title, content, author }, { new: true })
        .then(note => {
            if (!note) {
                return res.status(404).json({ error: 'Note not found' });
            }
            res.json(note)
        })
        .catch(err => {
            res.json(err)
        })
    })

// DELETE
router.delete('/:id', (req, res) => {
    Note.deleteOne({ _id: req.params.id })
    .then(() => {
        res.json({ message: `Note with id ${req.params.id} has been deleted`})
        })
    .catch(err => {
        res.json(err)
    })
})


export default router;