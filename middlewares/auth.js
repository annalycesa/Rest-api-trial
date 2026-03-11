import jwt from 'jsonwebtoken';
import notes from '../models/notes.js'; // Ensure the path to your model is correct

export const authentication = (req, res, next) => {
    // 1. Get the header
    const authHeader = req.headers.authorization;
    
    // 2. Extract the token
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return next({ message: 'Login required', status: 401 });
    }

    try {
        // 3. Verify token using jwt.verify and your secret key
        const decoded = jwt.verify(token, process.env.secret || 'your_secret');

        // 4. Attach user ID to the request object (matching what you used in noteController)
        req.userId = decoded._id; 
        next();
    } catch (err) {
        next({ message: 'Invalid or expired token', status: 401 });
    }
};

export const authorization = (req, res, next) => {
    const noteId = req.params.id;
    const userId = req.userId;

    // 1. Find the note to check who owns it
    notes.findById(noteId)
        .then(notes => {
            if (!notes) {
                return next({ message: 'Note not found', status: 404 });
            }

            // 2. Compare the note's author ID with the logged-in User ID
            if (notes.author.toString() === String(userId)) {
                next(); // Owner matches, proceed!
            } else {
                next({ message: 'You are not allowed to edit/delete this note', status: 403 });
            }
        })
        .catch(err => {
            next(err); 
        });
};