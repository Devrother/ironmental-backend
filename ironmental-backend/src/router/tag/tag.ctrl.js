import Tag from 'database/models/tag'

export const tagList = async (req, res) => {

    const tags = await Tag.find({}).select('name')
    let result = []
    for (let tag of tags) {
        result.push(tag.name)
    }
    res.send({
        tags: result
    })
}
