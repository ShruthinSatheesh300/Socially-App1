import { Schema, model } from 'mongoose';

const postSchema = new Schema(
  {
    userId: {
      type: String
    },

    postId: {
      type: String
    },
    content: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export default model('Post', postSchema);