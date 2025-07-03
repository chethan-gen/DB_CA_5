const express = require('express');
const User = require('../models/User');
const Contact = require('../models/Contacts');

const router = express.Router();


router.post("/contacts", async (req, res) => {
  try {
    const { name, phone, email, userId } = req.body;


    if (!name || !userId) {
      return res.status(400).json({message: 'Please provide a name and valid userId'});
    }

    const existsUser = await User.exists({ _id: userId });
    if (!existsUser) {
      return res.status(400).json({
        message: 'User not found'
      });
    }

   
    const duplicate = await Contact.findOne({ userId, phone });
    if (duplicate) {
      return res.status(409).json({message: 'Contact already exists'});
    }
    const newContact = new Contact({
      name,
      phone,
      email,
      userId
    });

    await newContact.save();

    return res.status(200).json({message: 'Contact saved successfully',contact: newContact});

  } catch (error) {
    return res.status(500).json({message: 'Something went wrong',error: error.message});
  }
});

module.exports = router;
