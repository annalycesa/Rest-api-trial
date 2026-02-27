//this is createing schema

import mongoose, { Schema } from 'mongoose';
const ObjectId = Schema.ObjectId;

const noteSchema = new mongoose.Schema({
    id: ObjectId,
    title: String,
    content: String,
    author: String,
}, { timestamps: true });

const notes = mongoose.model('notes', noteSchema); //create model Note based on noteSchema, and collection name is 'Note' in MongoDB

//mangoose will pluralized and lowecased the collection name, so it will be 'notes' in MongoDB
//here i changed it to 'notes' because i want to use 'notes' as collection name in MongoDB, 
// and also to match with the file name 'notes.js'

export default notes; //export model Note, so it can be used in other files.