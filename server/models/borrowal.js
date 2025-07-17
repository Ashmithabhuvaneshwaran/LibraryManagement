// const mongoose = require('mongoose')

// const borrowalSchema = new mongoose.Schema({
//     bookId: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true
//     },
//   memberId: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true
//   },
//     borrowedDate: {
//         type: Date,
//         required: false
//     },
//     dueDate: {
//         type: Date,
//         required: false
//     },
//     status: {
//         type: String,
//         required: false
//     },
// })

// module.exports = mongoose.model('Borrowal', borrowalSchema)
const mongoose = require('mongoose');

const borrowalSchema = new mongoose.Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Book'
  },
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  borrowedDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  dueDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['Borrowed', 'Returned', 'Overdue'], // optional: limit values
    default: 'Borrowed'
  },
  returnedDate: {
  type: Date,
  required: false
}
        
});

module.exports = mongoose.model('Borrowal', borrowalSchema);
