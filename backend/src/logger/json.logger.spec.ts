import { JsonLogger } from './json.logger';

describe('JsonLogger', () => {
  let logSpy: jest.SpyInstance;
  const jsonLoggerInstance = new JsonLogger();

  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    logSpy.mockReset();
  });

  it('should log correct format', () => {
    jsonLoggerInstance.warn('test', { a: 'b', c: 1 });
    expect(logSpy).toBeCalledTimes(1);
    expect(logSpy).toBeCalledWith(
      '{"level":"warn","message":"test","optionalParams":[{"a":"b","c":1}]}',
    );
  });
});
