import { 
  Interview,
  Tag,
} from 'database/models';
import {
  interviewListTransform,
  interviewTransform,
} from 'transformer/interviewTransformer';

export const listInterviews = async (req, res) => {
  const { tag, limit, offset, search } = req.query;

  const searchQuery = search ? search.trim() : '';
  const tagName = tag ? tag.toLowerCase() : 'all';
  const limitNum = parseInt(limit, 10) || 4;
  const offsetNum = parseInt(offset, 10) || 0;

  const interviews = tagName === 'all'
    ? await Interview.findWithPagination(offsetNum, limitNum, searchQuery)
    : (await Tag.joinInterviewsByName(tagName, limitNum, offsetNum, searchQuery)).interviews;

  const total = tagName === 'all'
    ? await Interview.getInterviewsCnt(searchQuery)
    : await Tag.getInterviewsCntInTag(tagName);

  res.send(
    interviewListTransform(interviews, {
      tagName, limitNum, offsetNum, total,
    }),
  );
};

export const showInterview = async (req, res) => {
  const interview = await Interview.findInterviewById(req.params.id);

  res.send(interviewTransform(interview));
};
