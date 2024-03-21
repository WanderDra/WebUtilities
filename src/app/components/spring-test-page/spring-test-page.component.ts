import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, of, Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { SpringService } from 'src/app/services/spring-service.service';

@Component({
  selector: 'app-spring-test-page',
  templateUrl: './spring-test-page.component.html',
  styleUrls: ['./spring-test-page.component.scss']
})
export class SpringTestPageComponent implements OnInit, OnDestroy {

  textList$ = new BehaviorSubject<string[]>([]);
  subscriptions = new Subscription();

  constructor(
    private ngZone: NgZone,
    private springService: SpringService) { }

  ngOnInit(): void {
    this.initData();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  initData(): void {
    const requestSub = this.springService.getSSEHelloWorld().pipe(
      tap(response => {
        this.ngZone.run(() => {
          this.textList$.next([...this.textList$.value, response]);
        });
      })
    ).subscribe((response: any) => {
      },
      error => {
        console.error(error);
        requestSub.unsubscribe();
        this.ngZone.run(() => {
          this.textList$.next([...this.textList$.value, 'SSE unsubscribed.']);
        });
    });
    this.subscriptions.add(requestSub);
  }

  onStopClick(): void {
    console.log('stop');
  }

}
