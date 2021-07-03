import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { AppEventType } from 'src/app/services/event-queue/app-event-type.enum';
import { AppEvent } from 'src/app/services/event-queue/app-event.class';
import { EventQueueService } from 'src/app/services/event-queue/event-queue.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  searchText: Observable<string> = of('dds');
  searchForm: FormGroup
  subsciption?: Subscription

  constructor(private eventQueue: EventQueueService) {
    this.searchForm = new FormGroup({
      searchText: new FormControl()
    })
  }

  ngOnInit(): void {
    this.subsciption = this.searchForm.get('searchText')?.valueChanges.subscribe(value => {
      this.eventQueue.dispatch(new AppEvent(AppEventType.searchTextChanged, value));
    });
  }


  ngOnDestroy(): void {
    this.subsciption?.unsubscribe()
  }


}
