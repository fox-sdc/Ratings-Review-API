import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(`mongodb://localhost${process.env.DB_PORT}/${process.env.DB_NAME}}`);

const characteristicsSchema = new mongoose.Schema({
  product_id: Number,
  ratings: {
    1: { type: Number, default: 0 },
    2: { type: Number, default: 0 },
    3: { type: Number, default: 0 },
    4: { type: Number, default: 0 },
    5: { type: Number, default: 0 },
  },
  recommended: {
    false: Number,
    true: Number,
  },
  characteristics: {
    size: {
      id: Number,
      value: Number,
    },
    width: {
      id: Number,
      value: Number,
    },
    comfort: {
      id: Number,
      value: Number,
    },
    quality: {
      id: Number,
      value: Number,
    },
  },
});

const reviewSchema = mongoose.Schema({
  product_id: Number,
  review_id: Number,
  rating: Number,
  summary: String,
  recommend: Boolean,
  response: String,
  body: String,
  date: { type: Date, default: Date.now },
  reviewer_name: String,
  helpfulness: Number,
  reported: { type: Boolean, default: false },
  photos: [{
    id: Number,
    url: String,
  }],
});

// eslint-disable-next-line no-unused-vars
const Review = mongoose.model('Reviews', reviewSchema);
// eslint-disable-next-line no-unused-vars
const Characteristics = mongoose.model('Characterisitcs', characteristicsSchema);
