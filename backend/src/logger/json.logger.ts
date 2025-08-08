import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class JsonLogger implements LoggerService {
  private createLog(level: string, message: unknown, params: unknown[]): string {
    const logEntry = {
      level, message, optionalParams: params, timestamp: new Date().toISOString(),
    };
    return JSON.stringify(logEntry);
  }

  log(message: unknown, ...params: unknown[]): void {
    console.log(this.createLog('log', message, params));
  }

  error(message: unknown, ...params: unknown[]): void {
    console.error(this.createLog('error', message, params));
  }

  warn(message: unknown, ...params: unknown[]): void {
    console.warn(this.createLog('warn', message, params));
  }

  debug(message: unknown, ...params: unknown[]): void {
    console.debug(this.createLog('debug', message, params));
  }

  verbose(message: unknown, ...params: unknown[]): void {
    console.log(this.createLog('verbose', message, params));
  }
}