import express from 'express';
import users from '../models/User.js';
const router = express.Router();
import {hash, compare} from '../helpers/password.js';
import generateToken from '../helpers/token.js';

const UserController = {
    login: async (req, res, next) => {
        const {name, email, password} = req.body;
        users.findOne({email})

        .then(users => {
                //check user exist or not
            if(users) {
            //check if pass match
                const isMatch=compare(password, users.password)
                if (isMatch) {
                    const token = generateToken({name: users.name, email: users.email, _id: users._id});
                    res.json({
                        _id: users._id,
                        name: users.name,
                        email: users.email,
                        token
                    })
                } else {
                    res.status(401).json({message: 'Invalid email or password'})
                }
            } else {
                res.status(401).json({message: 'User not found'})
            }
        })
        .catch(err => {
            res.send(err)
        })
    },

    register: async (req, res, next) => {
        let {name, email, password } = req.body || {};  //||{} kalau ga ada name and email, maka akan diisi dengan object kosong, jadi ga error

        users.create({name, email, password})
        .then   (users => {
            // 1. Buat token menggunakan ID dan Email dari user yang baru saja dibuat
            // Gunakan newUser._id agar konsisten dengan MongoDB
            const token = generateToken({ 
                name: users.name,
                _id: users._id, 
                email: users.email 
            });

            // 2. Kirim respon yang berisi data user dan TOKEN-nya
            res.status(201).json({
                name: users.name,
                _id: users._id,
                email: users.email,
                token: token // Sekarang user punya token untuk post notes!
            });
        })
        .catch(err => {
            next(err); //panggil next dengan err, supaya error handling middleware bisa menangani errornya
        })
    },

    loginGoogle: (req, res, next) => {
        const userObject = req.user.toObject()
        const token = generateToken(userObject)
        delete userObject.password

        res.json({ ...userObject, token})
    }
}

export default UserController;

// router.delete('/me', isAuth, async (req, res, next) => {
//     try {
//         const userId = req.users._id;

//         // 1. Delete all notes belonging to this user (Cascade Delete)
//         await notes.deleteMany({ author: userId });

//         // 2. Delete the user themselves
//         const deletedUser = await users.findByIdAndDelete(userId);

//         if (!deletedUser) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         res.json({ 
//             message: "User and all their notes have been deleted successfully." 
//         });
//     } catch (err) {
//         next(err);
//     }
// });


