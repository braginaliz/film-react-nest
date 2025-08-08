import { TskvLogger } from './tskv.logger';

describe('TskvLogger', () => {
    let logSpy: jest.SpyInstance;
    const tskvLoggerInstance = new TskvLogger();

    beforeEach(() => {
        logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
        logSpy.mockReset();
    });

    it('should log in TSKV format', () => {
        tskvLoggerInstance.warn('testing', { a: 'b', c: 1 });
        expect(logSpy).toBeCalledTimes(1);
        expect(logSpy).toBeCalledWith(
            'level=warn\ttmessage=testing\toptional=[{"a":"b","c":1}]'
        );
    });
});