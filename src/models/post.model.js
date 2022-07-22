import { Schema, model } from 'mongoose';
const postSchema = new Schema(
  {
    createrId: {
      type: 'ObjectId',
      ref: 'User',
      required: true
    },

    content: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default model('Post', postSchema);
