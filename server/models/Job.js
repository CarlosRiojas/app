const { Schema, model } = require('mongoose')

const jobSchema = new Schema({
  title: String,
  company: String,
  location: String,
  description: String,
  salary: [Number, Number],
  skills: [String],
  image: String,
  status: {
    type: String,
    enum: ['WISHLIST', 'APPLIED', 'INTERVIEW', 'OFFER', 'REJECTED']
  }
}, {
  timestamps: true
})


module.exports = model('Job', jobSchema)