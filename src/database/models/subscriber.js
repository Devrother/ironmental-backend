import mongoose, { Schema } from 'mongoose';
import { UnauthorizedError } from 'lib/errors'
import { UNAUTH_SUBSCRIBER_MSG } from 'messages/strings'

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
  ).orFail(new UnauthorizedError(UNAUTH_SUBSCRIBER_MSG));
};

export default mongoose.model('Subscriber', SubscriberSchema);
