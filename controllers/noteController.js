import notes from '../models/notes.js';

const NoteController = {
    find: (req, res, next) => {
        notes.find() 
        .populate('author', 'email name') //di response muncul email dan nama user yang membuat note ini, bukan hanya id usernya
        .then(allNotes => {
            res.json(allNotes)
        })
        .catch(err => {
            next(err)
        })
    },

    findById: (req, res,  next) => {
        notes.findById(req.params.id) 
        .populate('author', 'email name')
        .then(notes => {
            if (!notes) {
                return res.status(404).json({ error: 'notes not found' });
            }
            res.json(notes)
        })
        .catch(err => {
            next(err)
        })
    },

    create: (req, res, next) => {
        let { title, content} = req.body;

        const author = req.userId; 
        // Ambil id dari token terverif di middleware isAuth
        
        if (!title || !content) {
            return res.status(400).json({ error: 'Title and content are required' });
        }

        notes.create({ title, content, author })
            .then(data => {res.status(201).json(data)})
            .catch(err => {next(err)})       
    },

    update: (req, res, next) => { 
        let {title, content} = req.body

        if (!title || !content ) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        notes.findByIdAndUpdate(req.params.id, { title, content}, { new: true })

        .then(updatedNote => {
            if (!updatedNote) {
                // If nothing is found, it means the Note ID doesn't exist 
                // OR the user logged in is NOT the owner of this note.
                return res.status(403).json({ 
                    error: 'Unauthorized: You can only edit your own notes' 
                });
            }
            res.json(updatedNote);
        })

        .catch(err => {
            next(err)
        })
    },

    delete: (req, res, next) => {
        notes.deleteOne({ _id: req.params.id })
        .then(() => {
            res.json({ message: `notes with id ${req.params.id} has been deleted`})
            })
        .catch(err => {
            next(err)
        })
    }

}


export default NoteController;