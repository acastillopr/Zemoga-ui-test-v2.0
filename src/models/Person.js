const mongoose = require('mongoose');
const { Schema } = mongoose;

const PersonSchema = new Schema({
    name: { type: String, required: true},
    description: { type: String, required: true},
    source: { type: String, required: true},
    voteUp: { type: Number, default:0},
    voteDown: { type: Number, default:0},
    date: { type: Date, default: Date.now() },
    imgUrl: { type: String, required: true}
});

module.exports = mongoose.model('Person', PersonSchema)