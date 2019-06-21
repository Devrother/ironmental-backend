import mongoose, { Schema } from 'mongoose';

const SubscriberSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  email: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  confirmCode: {
    type: String,
  },
  isCertify: {
    type: Boolean,
    required: true,
  },
});

SubscriberSchema.statics.updateSubByEmail = function(email, uuid_v4) {
  return this.findOneAndUpdate(
    { email },
    { confirmCode: uuid_v4 },
    { runValidators: true },
  ).orFail();
};

SubscriberSchema.statics.updateByConfirmCode = function(code) {
  return this.findOneAndUpdate(
    { confirmCode: code },
    { confirmCode: null, isCertify: true },
    { runValidators: true },
  ).orFail();
};

export default mongoose.model('Subscriber', SubscriberSchema);
