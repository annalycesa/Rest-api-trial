//this is createing schema

import mongoose, { Schema } from 'mongoose';
const ObjectId = Schema.ObjectId;
import {hash} from '../helpers/password.js';

const usersSchema = new mongoose.Schema({
    id: ObjectId,
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {
        type: String, 
        required: function() {
        // Only require password if there is no googleId (if you use one)
        // Otherwise, just change this to 'false'
        return !this.googleId;
        }
    },
    googleId: {type: String, default: null}
}, { timestamps: true });

usersSchema.pre('save', async function() { 
    //pre save itu artinya sebelum data disimpan ke database, 
    //fungsi ini akan dijalankan, jadi kita bisa 
    // melakukan sesuatu sebelum data disimpan ke database, 
    // dalam hal ini kita akan hash password sebelum disimpan ke database
    if(!this.isModified('password')) return  
    if(!this.isModified('password') || !this.password) return  
    this.password = await hash(this.password)
})

const users = mongoose.model('users', usersSchema); //create model users based on usersSchema, and collection name is 'users' in MongoDB

export default users; //export model users, so it can be used in other files.