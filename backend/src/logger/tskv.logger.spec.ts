import { TskvLogger } from './tskv.logger'; // Укажите правильный путь к вашему файлу

describe('TskvLogger', () => {
  let logger: TskvLogger;
  let logSpy: jest.SpyInstance;
  let warnSpy: jest.SpyInstance;
  let errorSpy: jest.SpyInstance;
  let debugSpy: jest.SpyInstance;
  let verboseSpy: jest.SpyInstance;

  beforeEach(() => {
    logger = new TskvLogger();
    logSpy = jest.spyOn(console, 'log').mockImplementation();
    warnSpy = jest.spyOn(console, 'warn').mockImplementation();
    errorSpy = jest.spyOn(console, 'error').mockImplementation();
    debugSpy = jest.spyOn(console, 'log').mockImplementation();
    verboseSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should format and log messages correctly for log level', () => {
    const message = 'Test log message';
    const optionalParam = { additional: 'info' };

    logger.log(message, optionalParam);

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('level=log'));
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining('message=Test log message'),
    );
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining(JSON.stringify([optionalParam])),
    );
  });

  it('should format and log messages correctly for warn level', () => {
    const message = 'Test warn message';
    const optionalParam = { warning: 'info' };

    logger.warn(message, optionalParam);

    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('level=warn'));
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('message=Test warn message'),
    );
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining(JSON.stringify([optionalParam])),
    );
  });

  it('should format and log messages correctly for error level', () => {
    const message = 'Test error message';
    const optionalParam = { errorDetail: 'info' };

    logger.error(message, optionalParam);

    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining('level=error'),
    );
    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining('message=Test error message'),
    );
    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining(JSON.stringify([optionalParam])),
    );
  });

  it('should format and log messages correctly for debug level', () => {
    const message = 'Test debug message';
    const optionalParam = { debugInfo: 'info' };

    logger.debug(message, optionalParam);

    expect(debugSpy).toHaveBeenCalledWith(
      expect.stringContaining('level=debug'),
    );
    expect(debugSpy).toHaveBeenCalledWith(
      expect.stringContaining('message=Test debug message'),
    );
    expect(debugSpy).toHaveBeenCalledWith(
      expect.stringContaining(JSON.stringify([optionalParam])),
    );
  });

  it('should format and log messages correctly for verbose level', () => {
    const message = 'Test verbose message';
    const optionalParam = { verboseInfo: 'info' };

    logger.verbose(message, optionalParam);

    expect(verboseSpy).toHaveBeenCalledWith(
      expect.stringContaining('level=verbose'),
    );
    expect(verboseSpy).toHaveBeenCalledWith(
      expect.stringContaining('message=Test verbose message'),
    );
    expect(verboseSpy).toHaveBeenCalledWith(
      expect.stringContaining(JSON.stringify([optionalParam])),
    );
  });
});
