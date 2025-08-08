import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class TskvLogger implements LoggerService {
  formatMessage(level: string, message: any, ...optionalParams: any[]) {
    const optional =
      optionalParams.length > 0 ? JSON.stringify(optionalParams) : '';
    return [`level=${level}`, `message=${message}`, optional]
      .filter((data) => data)
      .join('\t');
  }
  log(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('log', message, optionalParams));
  }
  warn(message: any, ...optionalParams: any[]) {
    console.warn(this.formatMessage('warn', message, optionalParams));
  }
  error(message: any, ...optionalParams: any[]) {
    console.error(this.formatMessage('error', message, optionalParams));
  }
  debug(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('debug', message, optionalParams));
  }
  verbose(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('verbose', message, optionalParams));
  }
}
