import handleExceptions from './handleExceptions';

describe('[Middleware] handleExceptions Test', () => {
  test('should be no exception and normal operation', async () => {
    const asyncMock = jest.fn().mockResolvedValue(1);
    const req = {};
    const res = {};
    const next = jest.fn();

    await handleExceptions(asyncMock)(req, res, next);
    expect(next).not.toHaveBeenCalled();
  });

  test('should call next() error middleware to pass the client and server exception', async () => {
    const asyncMock = jest.fn().mockRejectedValue(new Error());
    const req = {};
    const res = {};
    const next = jest.fn();

    await handleExceptions(asyncMock)(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});
