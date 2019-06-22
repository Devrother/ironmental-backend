import {
  interviewTransform,
  interviewListTransform,
} from './interviewTransformer';

describe('[Transformer] interviewTransformer Test', () => {
  test('interviewTransform test : ', () => {
    const interview = {
      tags: ['tag'],
      _id: '1',
      question: 'question',
      answer: 'answer',
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    };

    const expectedInterview = {
      tags: ['tag'],
      id: '1',
      question: 'question',
      answer: 'answer',
      created: 'createdAt',
      updated: 'updatedAt',
      links: {
        self: 'api.ironmental.net/v1/interviews/1',
      },
    };

    expect(expectedInterview).toEqual(interviewTransform(interview));
  });

  test('interviewListTransform  test : ', () => {
    const interviewList = [
      {
        tags: ['tag'],
        _id: '1',
        question: 'question',
        answer: 'answer',
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
      },
      {
        tags: ['tag2', 'tag2_2'],
        _id: '2',
        question: 'question2',
        answer: 'answer2',
        createdAt: 'createdAt2',
        updatedAt: 'updatedAt2',
      },
    ];

    const expectedInterviewList = {
      datas: [
        {
          tags: ['tag'],
          id: '1',
          question: 'question',
          answer: 'answer',
          created: 'createdAt',
          updated: 'updatedAt',
          links: {
            self: 'api.ironmental.net/v1/interviews/1',
          },
        },
        {
          tags: ['tag2', 'tag2_2'],
          id: '2',
          question: 'question2',
          answer: 'answer2',
          created: 'createdAt2',
          updated: 'updatedAt2',
          links: {
            self: 'api.ironmental.net/v1/interviews/2',
          },
        },
      ],
      links: {
        prev: 'api.ironmental.net/v1/interviews?tag=tag&offset=0&limit=4',
        next: 'api.ironmental.net/v1/interviews?tag=tag&offset=7&limit=4',
      },
    };
    const args = {
      offsetNum: 3,
      limitNum: 4,
      tagName: 'tag',
      total: 10,
    };

    expect(expectedInterviewList).toEqual(
      interviewListTransform(interviewList, args),
    );
  });
});
