import Tag from 'database/models/tag'

export const tagList = async (req, res) => {
    const tags = await Tag.findTagsSelect('name')
    const result = Array.from(tags, (obj) => obj.name)

    res.send({ tags: result })
}
