const { API } = process.env;

export const interviewTransform = interview => {
  const { _id, tags, question, answer, createdAt, updatedAt } = interview;

  return {
    tags,
    id: _id,
    question,
    answer,
    created: createdAt,
    updated: updatedAt,
    links: {
      self: `${API}/interviews/${_id}`,
    },
  };
};

export const interviewListTransform = (interviews, args) => {
  const { searchQuery, offsetNum, limitNum, tagName, total } = args;
  const nextLink = offsetNum + limitNum >= total ? null
    : `${API}/interviews?tag=${tagName}&search=${searchQuery}&offset=${offsetNum +
    limitNum}&limit=${limitNum}`;

  return {
    datas: interviews.map(interviewTransform),
    links: {
      // prev: prevLink,
      next: nextLink,
    },
  };
};
