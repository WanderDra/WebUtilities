import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgxCaptureService } from 'ngx-capture';
import { tap } from 'rxjs/operators';
// import { Clipboard } from '@angular/cdk/clipboard';
import { Observable, Observer, Subscription } from 'rxjs';
import { ConsoleRecord } from './model';
import * as moment from 'moment';
/// <reference path="clipboard.d.ts" />


@Component({
  selector: 'app-ng-capture',
  templateUrl: './ng-capture.component.html',
  styleUrls: ['./ng-capture.component.scss']
})
export class NgCaptureComponent implements OnInit {

  @ViewChild('captureScreen', {static: true}) screen: ElementRef; 

  subscriptions = new Subscription();
  consoleRecord = new ConsoleRecord();

  constructor(private captureService: NgxCaptureService) { }

  ngOnInit(): void {
    this.recordConsoleOutput();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onCaptureClick(): void {
    this.subscriptions.add(
      this.captureScreenToClicpboard().subscribe()
    );
  }

  captureScreenToClicpboard(): Observable<string> {
    console.log('testtest');
    console.log('testtest');
    console.log('testtest');
    console.log('testtest');
    console.log('testtest');
    const logElement = document.createElement('div');
    document.body.append(logElement);
    this.consoleRecord.allLog.forEach(
      log => {
        const record = document.createElement('div');
        record.append(JSON.stringify(log));
        logElement.append(record);
      }
    );
    logElement.append();
    const content: HTMLElement = document.body;
    return this.captureService.getImage(content, true).pipe(
      tap(async img => {
        const image = await fetch(img);
        const blob = image.blob();
        navigator.clipboard.write([new ClipboardItem(
          {['image/png']: blob}
        )]);
      })
    )
  }

  recordConsoleOutput(): void {
    const global = this;
    const TS = () => {
      return moment().utc().toISOString();
    }
    window.onerror = (error, url, line) => {
      this.consoleRecord.allLog.push({
        type: "exception",
        timeStamp: TS(),
        value: { error, url, line }
      })
      return false;
    }
    window.onunhandledrejection = (e) => {
      this.consoleRecord.allLog.push({
        type: "promiseRejection",
        timeStamp: TS(),
        value: e.reason
      })
    } 
  
    function hookLogType(logType) {
      const original= console[logType].bind(console);
     
      return function() {
        if (!global.consoleRecord) {
          global.consoleRecord = new ConsoleRecord();
        }
        global.consoleRecord.allLog.push({ 
          type: logType, 
          timeStamp: TS(), 
          value: [...arguments] 
        })
        original.apply(console, arguments);
      }
    }
  
    ['log', 'error', 'warn', 'debug'].forEach(logType=>{
      console[logType] = hookLogType(logType);
    })
  }
}
