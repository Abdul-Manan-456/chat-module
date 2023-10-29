const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group', 
    required: true,
  },
  role: {
    type: String,
    default: 'Member', 
    required: true,
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  },
});

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;
