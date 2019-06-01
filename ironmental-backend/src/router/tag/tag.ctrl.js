import Tag from 'database/models/tag'

export const tagList = async (req, res) => {

    const tags = await Tag.find()

    res.send(tags)
}
