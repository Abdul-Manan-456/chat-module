const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  image :{
    type : String
  } , 
  created_at: {
    type: Date,
    default: Date.now,
  },

  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'GroupMessage', 
    },
  ],
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;


  // members: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Member', 
  //   },
  // ],