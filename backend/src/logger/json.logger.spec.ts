import { JsonLogger } from './json.logger';

describe('JsonLogger Tests', () => {
  let loggerInstance: JsonLogger;
  let logSpy: jest.SpyInstance;
  let errorSpy: jest.SpyInstance;

  beforeEach(() => {
    loggerInstance = new JsonLogger();
    logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    logSpy.mockRestore();
    errorSpy.mockRestore();
  });

  describe('log method', () => {
    it('should format log message as JSON', () => {
      const testMessage = 'sample log message';
      const additionalParams = ['extra1', 'extra2'];

      loggerInstance.log(testMessage, ...additionalParams);

      expect(logSpy).toHaveBeenCalledWith(
        expect.stringMatching(
            /^{"level":"log","message":"test message","optionalParams":\[\["param1","param2"\]\],"timestamp":".*"}$/,
          ),
        );
      });
    });
  

  describe('error method', () => {
    it('should format error message as JSON', () => {
      const testError = 'sample error message';

      loggerInstance.error(testError);

      expect(errorSpy).toHaveBeenCalledWith(
            expect.stringMatching(
                /^{"level":"error","message":"error message","optionalParams":\[\[\]\],"timestamp":".*"}$/,
              ),
            )
  });
        });
      });