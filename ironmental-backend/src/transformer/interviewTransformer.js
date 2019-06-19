const {
    API,
} = process.env

export const interviewListTransform = (interviews, args) => {
    let { offsetNum, limitNum, tagName, total } = args
    let prevLink = `${API}/interviews?tag=${tagName}&offset=${offsetNum - limitNum}&limit=${limitNum}`
    let nextLink = `${API}/interviews?tag=${tagName}&offset=${offsetNum + limitNum}&limit=${limitNum}`

    switch (true) {
        case offsetNum == 0:
            prevLink = null
            break
        case offsetNum == total-1:
            nextLink = null
            break
        case offsetNum + limitNum > total:
            nextLink = `${API}/interviews?tag=${tagName}&offset=${total-1}&limit=${limitNum}`
            break
        case offsetNum - limitNum < 0:
            prevLink = `${API}/interviews?tag=${tagName}&offset=0&limit=${limitNum}`
            break
    }

    return {
        datas: interviews.map(interviewTransform),
        links: {
            prev: prevLink,
            next: nextLink
        }
    }
}

export const interviewTransform = (interivew) => {
    const { _id, tags, question, answer, createdAt, updatedAt } = interivew

    return {
        tags: tags,
        id: _id,
        question: question,
        answer: answer,
        created: createdAt,
        updated: updatedAt,
        links: {
            self: `api.ironmental.net/v1/interviews/${_id}`
        }
    }
}
