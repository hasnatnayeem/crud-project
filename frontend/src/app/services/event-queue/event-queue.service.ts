import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppEventType } from './app-event-type.enum';
import { AppEvent } from './app-event.class';

// Used as a event broker throughout the application
// Components can communicate with each other even if they are not in parent child relationship

@Injectable({
  providedIn: 'root'
})
export class EventQueueService {
  private eventBrocker = new Subject<AppEvent<any>>();

  on(eventType: AppEventType): Observable<AppEvent<any>> {
    return this.eventBrocker.pipe(filter(event => event.type === eventType));
  }

  dispatch<T>(event: AppEvent<T>): void {
    this.eventBrocker.next(event);
  }
}
