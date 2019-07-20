import mongoose, { Schema } from 'mongoose';

const SubscriberSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  email: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  isCertify: {
    type: Boolean,
    required: true,
  },
  favoriteTags: [{ type: String }],
  received: [{ type: Schema.Types.ObjectId, ref: 'Interview' }],
});

SubscriberSchema.statics.updateById = function(id) {
  return this.findOneAndUpdate(
    { _id: id },
    { isCertify: true },
    { runValidators: true },
  ).orFail();
};

export default mongoose.model('Subscriber', SubscriberSchema);
