const createMsgForm = (status, message) => {
  return {
    error: {
      status,
      message,
    },
  };
};

export const HTTP_404_MSG = (message='Not Found Error') => createMsgForm(404, message);
export const HTTP_500_MSG = (message='Internal Server Error') => createMsgForm(500, message);
export const HTTP_400_MSG = (message='Bad Request') => createMsgForm(400, message);
export const HTTP_403_MSG = (message='Unauthorized Error') => createMsgForm(403, message);