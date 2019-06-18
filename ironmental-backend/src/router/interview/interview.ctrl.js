import {
    Interview,
    Tag
} from 'database/models'
import { interviewListTransform, interviewTransform } from 'transformer/interviewTransformer'

export const listInterviews = async (req, res) => {
    const { tag, limit, offset } = req.query;

    let tagName = tag ? tag.toLowerCase() : 'all';
    let limitNum = parseInt(limit) || 4;
    let offsetNum = parseInt(offset) || 0;

    if (!tagName || tagName === 'all') {
        const total = await Interview.countDocuments()
        const interviews = await Interview.findWithPagination(offsetNum, limitNum)

        return res.send(interviewListTransform(interviews, { tagName, limitNum, offsetNum, total }))
    }

    const { interviews } = await Tag.joinInterviewsByName(tagName, limitNum, offsetNum)
    
    res.send(interviewListTransform(interviews, tag, limit, offset))
}

export const showInterview = async (req, res) => {
    const interview = await Interview.findInterviewById(req.params.id)
    
    res.send(interviewTransform(interview))
}
