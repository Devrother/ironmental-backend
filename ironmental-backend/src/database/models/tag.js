import mongoose, { Schema } from 'mongoose';


const TagSchema = new Schema({
    createdAt: { type: Date, default: Date.now },
    name: {
        type: String,
        minlength: 1,
        maxlength: 30
    },
    // interviews: {
    //     type: [Schema.Types.ObjectId],
    //     default: []
    // },
    interviews: [{ type: Schema.Types.ObjectId, ref: 'Interview' }]
});


export default mongoose.model('Tag', TagSchema)