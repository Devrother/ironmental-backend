import { Interview, Tag } from 'database/models';
import {
  interviewListTransform,
  interviewTransform,
} from 'transformer/interviewTransformer';

export const listInterviews = async (req, res) => {
  const { tag, limit, offset } = req.query;

  const tagName = tag ? tag.toLowerCase() : 'all';
  const limitNum = parseInt(limit, 10) || 4;
  const offsetNum = parseInt(offset, 10) || 0;

  if (!tagName || tagName === 'all') {
    const total = await Interview.getInterviewsCnt();
    const interviews = await Interview.findWithPagination(offsetNum, limitNum);

    return res.send(
      interviewListTransform(interviews, {
        tagName,
        limitNum,
        offsetNum,
        total,
      }),
    );
  }

  const total = await Tag.getInterviewsCntInTag();
  const { interviews } = await Tag.joinInterviewsByName(
    tagName,
    limitNum,
    offsetNum,
  );

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
