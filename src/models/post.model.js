import { Schema, model } from 'mongoose';
const postSchema = new Schema(
  {
    creator: {
      type: Schema.ObjectId,
      ref: 'User'
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
