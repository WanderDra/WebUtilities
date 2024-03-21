import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpringService {

  constructor(private http: HttpClient) { }

  getSSEHelloWorld(): Observable<string> {
    const url = 'http://localhost:8080/SSEHello';
    return new Observable(observer => {
      const source = new EventSource(url);
      source.onmessage = (event) => observer.next(event.data);
      source.onerror = (event) => observer.error(event);
      return () => source.close();
    });
    // return this.http.get(url, {responseType: 'text'}).pipe(
    //   map(response => {
    //     return response;  
    //   })
    // );
  }

}
