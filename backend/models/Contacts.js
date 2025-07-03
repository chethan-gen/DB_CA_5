const mongoose = require('mongoose');

const constactSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    phone:{
        type : String
    },
    email:{
        type : String
    },
    userId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
});

const Contact = mongoose.model('Contacts',constactSchema);
module.exports = Contact;