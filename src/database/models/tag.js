import mongoose, { Schema } from 'mongoose';
import { NotFoundError } from 'lib/errors';
import { NOT_FOUND_TAG} from 'messages/strings';

const TagSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  name: {
    type: String,
    minlength: 1,
    maxlength: 30,
  },
  interviews: [{ type: Schema.Types.ObjectId, ref: 'Interview' }],
});

TagSchema.statics.findTagsSelect = function(atr) {
  return this.find()
    .select(atr)
};

TagSchema.statics.joinInterviewsByName = function(
  tagName,
  limitNum,
  offsetNum,
  searchData
) {
  return this.findOne({ name: tagName }, 'interviews')
    .populate({
      path: 'interviews',
      options: {
        limit: limitNum,
        sort: { createdAt: -1 },
        skip: offsetNum,
      },
      match: {
          $or: [{question:{ $regex: searchData, $options: "i" }}]
      }
    })
    .orFail(new NotFoundError(NOT_FOUND_TAG));
};

TagSchema.statics.getInterviewsCntInTag = function(tagName) {
  return this.findOne({ name: tagName })
    .select('interviews').then((data) => {
      return data.interviews.length
    })
};

export default mongoose.model('Tag', TagSchema);
