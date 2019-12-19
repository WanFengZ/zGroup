import mongoose from 'mongoose'

const Schema = mongoose.Schema

const Cart = new Schema({
  cartNo: {
    type: String,
    require: true
  },
  goodsId: {
    type: String,
    require: true
  },
  goodsDetail: {
    type: {
      name: String,
      price: Number,
      imgs: Array
    },
    require: true
  },
  user: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    require: true
  }
})

export default mongoose.model('Cart', Cart)
