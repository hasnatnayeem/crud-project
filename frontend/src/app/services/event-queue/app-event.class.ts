import { AppEventType } from "./app-event-type.enum";

export class AppEvent<T> {
    constructor(
      public type: AppEventType,
      public payload: T,
    ) {}
  }