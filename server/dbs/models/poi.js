import mongoose from 'mongoose'

const Schema = mongoose.Schema

const Poi = new Schema({
  name: {
    type: String
  },
  type: {
    type: String
  },
  province: {
    type: String
  },
  city: {
    type: String
  },
  county: {
    type: String
  },
  area: {
    type: String
  },
  areaCode: {
    type: String
  },
  tel: {
    type: String
  },
  module: {
    type: String
  },
  longitude: {
    type: Number
  },
  latitude: {
    type: Number
  }
})

export default mongoose.model('Poi', Poi)
