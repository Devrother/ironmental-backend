import mongoose from 'mongoose';
import { NotFoundError } from 'lib/errors';
import { SERVER_ERROR_MSG } from 'messages/strings';
import errorResponse from './errorResponse';

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

describe('[Middleware] errorResponse Test', () => {
  const { CastError } = mongoose.Error;
  const middleware = errorResponse;

  test('DocumentNotFoundError test -> 404 Error', () => {
    const req = {};
    const next = jest.fn();
    const err = new NotFoundError();
    const res = mockResponse();

    middleware(err, req, res, next);

    expect(res.send).toHaveBeenCalledWith({
      error: { message: 'Not Found Error', status: 404 },
    });
  });

  test('CaseError test -> 404 Error', () => {
    const req = {};
    const next = jest.fn();
    const err = new CastError();
    const res = mockResponse();

    middleware(err, req, res, next);

    expect(res.send).toHaveBeenCalledWith({
      error: { message: 'Not Found Error', status: 404 },
    });
  });

  test('500 Error', () => {
    const req = {};
    const next = jest.fn();
    const err = new Error();
    const res = mockResponse();

    middleware(err, req, res, next);

    expect(res.send).toHaveBeenCalledWith({
      error: { message: SERVER_ERROR_MSG, status: 500 },
    });
  });
});
