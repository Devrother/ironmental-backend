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
  const { offsetNum, limitNum, tagName, total } = args;
  let prevLink = `${API}/interviews?tag=${tagName}&offset=${offsetNum -
    limitNum}&limit=${limitNum}`;
  let nextLink = `${API}/interviews?tag=${tagName}&offset=${offsetNum +
    limitNum}&limit=${limitNum}`;

  switch (true) {
    case offsetNum === 0:
      prevLink = null;
      break;
    // case offsetNum >= total - 1:
    //   prevLink = `${API}/interviews?tag=${tagName}&offset=${total -
    //     limitNum}&limit=${limitNum}`;
    //   nextLink = null;
    //   break;
    case offsetNum + limitNum >= total:
      prevLink = `${API}/interviews?tag=${tagName}&offset=${total -
      limitNum}&limit=${limitNum}`;
      nextLink = null;
      break;
    case offsetNum - limitNum < 0:
      prevLink = `${API}/interviews?tag=${tagName}&offset=0&limit=${limitNum}`;
      break;
    default:
      break;
  }

  return {
    datas: interviews.map(interviewTransform),
    links: {
      prev: prevLink,
      next: nextLink,
    },
  };
};
