import Interview from 'database/models/interview'
import Tag from 'database/models/tag'

export const listInterviews = async (req, res) => {
    // GET /interviews?tag={tag_name}&limit={limit_num}&offset={offset_num}

    // TODO: 깔끔하게, 태그 이름 소문자로 변경
    let tagName = req.query.tag
    let limitNum = parseInt(req.query.limit) || 4
    let offsetNum = parseInt(req.query.offset) || 0


    // TODO: 리펙토링
    // let interviews

    if (!tagName || tagName === 'all') {
        const interviews = await Interview.find().skip(offsetNum).limit(limitNum)
        return res.send(interviews)
    }

    const interviewsInTag = await Tag.findOne({ name: tagName }, 'interviews').populate({
        path: 'interviews',
        options: {
            limit: limitNum,
            sort: { createdAt: -1 },
            skip: offsetNum
        }
    })
    let result = []
    for (let interview of interviewsInTag.interviews) {
        result.push(interview)
    }

    res.send(result)

}

export const showInterview = async (req, res) => {
    // GET /interviews/:id

    const interview = await Interview.find({_id: req.params.id})
    
    res.send(interview)
}

export const createInterview = async (req, res) => {
    // TODO: 리펙토링
    const interview = new Interview({
        question: req.body.question,
        answer: req.body.answer,
        tags: req.body.tags
    })

    const interviewId = (await interview.save())._id

    for (let tag of req.body.tags) {
        // TODO: tag 소문자로 변경해서 찾고 저장할때도 소문자로 저장
        let result = await Tag.findOne({ name: tag })
        if (!result) {
            let newTag = new Tag({
                name: tag,
                interviews: [interviewId]
            })

            await newTag.save()
        } else {
            await Tag.findOneAndUpdate({ name: tag }, {
                $push: {
                    interviews: interviewId
                }
            })

        }

    }
    res.status(500).send({
        message: "Success"
    })
}