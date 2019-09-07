import mongoose, { Schema } from 'mongoose';
import { NotFoundError } from 'lib/errors'
import { NOT_FOUND_SUBSCRIBER } from 'messages/strings'

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

SubscriberSchema.statics.updateCertifyValueById = function(id, certifyValue) {
  return this.findOneAndUpdate(
    { _id: id },
    { isCertify: certifyValue },
    { runValidators: true },
  ).orFail(new NotFoundError(NOT_FOUND_SUBSCRIBER));
};

export default mongoose.model('Subscriber', SubscriberSchema);
