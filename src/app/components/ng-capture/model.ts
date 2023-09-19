export class ConsoleRecord {
    allLog: LogRecord[];
    defaultLog: string[];
    defaultError: string[];
    defaultWarn: string[];
    defaultDebug: string[];

    constructor() {
        this.allLog = [];
        this.defaultLog = [];
        this.defaultError = [];
        this.defaultWarn = [];
        this.defaultDebug = [];    
    }
}

export class LogRecord {
    type: string;
    timeStamp: string;
    value: any;
}