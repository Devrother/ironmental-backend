const createMsgForm = (status, message) => {
  return {
    error: {
      status,
      message,
    },
  };
};

export const HTTP_404_MSG = createMsgForm(404, 'Not Found');
export const HTTP_500_MSG = createMsgForm(500, 'Internal Server Error');
export const HTTP_400_MSG = createMsgForm(400, 'Bad Request');
