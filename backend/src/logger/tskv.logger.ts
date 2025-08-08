import { LoggerService, Injectable } from '@nestjs/common';

@Injectable()
export class TskvLogger implements LoggerService {
    formatMessage(level: string, message: any, ...optionalParams: any[]) {
        return `level=${level}\tmessage=${message}\toptionalParams=${optionalParams}\n`;
      }

  log(message: any, ...optionalParams: any[]) {
    process.stdout.write(this.formatMessage('log', message, ...optionalParams));
  }

  error(message: any, ...optionalParams: any[]) {
    process.stderr.write(this.formatMessage('error', message, ...optionalParams));
  }

  fatal(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('fatal', message, optionalParams));
}

  warn(message: any, ...optionalParams: any[]) {
    process.stdout.write(this.formatMessage('warn', message, ...optionalParams));
  }

  debug(message: any, ...optionalParams: any[]) {
    process.stdout.write(this.formatMessage('debug', message, ...optionalParams));
  }

  verbose(message: any, ...optionalParams: any[]) {
    process.stdout.write(this.formatMessage('verbose', message, ...optionalParams));
  }
}