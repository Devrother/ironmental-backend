import mongoose from 'mongoose';
import errorResponse from './errorResponse';

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

describe('[Middleware] errorResponse Test', () => {
  const { DocumentNotFoundError, CastError } = mongoose.Error;
  const middleware = errorResponse;

  test('DocumentNotFoundError test -> 404 Error', () => {
    const req = {};
    const next = jest.fn();
    const err = new DocumentNotFoundError();
    const res = mockResponse();

    middleware(err, req, res, next);

    expect(res.send).toHaveBeenCalledWith({
      error: { message: 'Not Found', status: 404 },
    });
  });
  test('CaseError test -> 404 Error', () => {
    const req = {};
    const next = jest.fn();
    const err = new CastError();
    const res = mockResponse();

    middleware(err, req, res, next);

    expect(res.send).toHaveBeenCalledWith({
      error: { message: 'Not Found', status: 404 },
    });
  });

  test('500 Error', () => {
    const req = {};
    const next = jest.fn();
    const err = new Error();
    const res = mockResponse();

    middleware(err, req, res, next);

    expect(res.send).toHaveBeenCalledWith({
      error: { message: 'Internal Server Error', status: 500 },
    });
  });
});
