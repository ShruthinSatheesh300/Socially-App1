import { Schema, model } from 'mongoose';
// import mongoosePaginate from 'mongoose-paginate'
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
// postSchema.plugin(mongoosePaginate);

export default model('Post', postSchema);
