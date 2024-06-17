import { Injectable } from '@nestjs/common';
import pino from 'pino';

const logger = pino();

class LogData {
  public message?: string;
  public data?: any;
}

@Injectable()
export class AppService {
  getHello(): string {
    return 'Application is up and running! ✅';
  }

  private writeLog(logMethod: string, logData: LogData) {
    logData = logData || { message: '', data: {} };
    (logData as any).timeLocal = new Date().toISOString();
    logger[logMethod](logData);
  }

  debug(logData: LogData) {
    this.writeLog('debug', logData);
  }

  info(logData: LogData) {
    this.writeLog('info', logData);
  }

  error(logData: LogData) {
    this.writeLog('error', logData);
  }

  warn(logData: LogData) {
    this.writeLog('warn', logData);
  }

  fatal(logData: LogData) {
    this.writeLog('fatal', logData);
  }
}
