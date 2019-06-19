import mongoose, { Schema } from 'mongoose';

const InterviewSchema = new Schema({
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    question: { 
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    answer: {
        type: String,
        required: true,
        minlength: 10
    },
    tags: {
        type: Array,
        default: []
    }
});

InterviewSchema.statics.findInterviewById = function(id) {
    return this.findOne({ _id: id }).orFail()
}

InterviewSchema.statics.findWithPagination = function(skipNum, limitNum) {
    return this.find().skip(skipNum).limit(limitNum).orFail()
}

InterviewSchema.statics.getInterviewsCnt = function() {
    return this.countDocuments()
}

export default mongoose.model('Interview', InterviewSchema);