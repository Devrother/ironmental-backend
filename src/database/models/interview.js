import mongoose, { Schema } from 'mongoose';
import { NotFoundError } from 'lib/errors';
import { NOT_FOUND_INTERVIEW } from 'messages/strings'

const InterviewSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  question: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
  },
  answer: {
    type: String,
    required: true,
    minlength: 10,
  },
  tags: {
    type: Array,
    default: [],
  },
  keywords: {
    type: Array,
    default: [],
  },
});

InterviewSchema.statics.findInterviewById = function(id) {
  // return this.findOne({ _id: id })
  //   .orFail(new NotFoundError(NOT_FOUND_INTERVIEW));
  return this.findById(id)
    .orFail(new NotFoundError(NOT_FOUND_INTERVIEW));
};

InterviewSchema.statics.findWithPagination = function(skipNum, limitNum) {
  return this.find()
    .skip(skipNum)
    .limit(limitNum)
    .sort('-createdAt');
};

InterviewSchema.statics.getInterviewsCnt = function() {
  return this.countDocuments();
};

export default mongoose.model('Interview', InterviewSchema);
