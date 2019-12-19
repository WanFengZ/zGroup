import mongoose from 'mongoose'

const Schema = mongoose.Schema

const Order = new Schema({
  orderId: {
    type: String,
    require: true
  },
  total: {
    type: Number,
    require: true
  },
  status: {
    type: Number,
    require: true
  },
  detail: {
    type: {
      name: String,
      price: Number,
      imgs: Array,
      count: Number
    },
    require: true
  },
  user: {
    type: String,
    require: true
  },
  time: {
    type: Date,
    require: true
  }
})

export default mongoose.model('Order', Order)
