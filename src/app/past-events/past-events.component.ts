import { Component, OnInit } from '@angular/core';
import { Events } from '../models/events';
import { EventsService } from '../events-service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-past-events',
  templateUrl: './past-events.component.html',
  styleUrls: ['./past-events.component.css']
})
export class PastEventsComponent implements OnInit {
  isLoading = false;
  events: Events[];

  totalEvents = 0;
  eventsPerPage = 5;
  pageSizeOptions = [1,2,5,10];
  currentPage = 1;
  userIsAuthenticated = false;
  userId: string;


  constructor(public eventService: EventsService) { }
  // id: string,
  // eventName: string,
  // eventType: string,
  // eventDate: string,
  // eventComments: string,
  // image: string,
  // creator: string
  ngOnInit() {
    this.isLoading = true;
    this.eventService.getEvents(this.eventsPerPage,this.currentPage)
    .pipe(map((postData)=>{
      console.log(postData);
      return {
        eventsFetched: postData.content.map(event=>{
          return {
            id: event._id,
            eventName: event.name,
            eventType: event.type,
            eventDate: event.date,
            eventComments: event.comments,
            image: event.image,
            creator: null//null for now until we add users
          }
        }),
        eventCount: postData.eventCount
      }
    }))
    .subscribe((events)=>{
      console.log(events);
      this.events = events.eventsFetched;
      this.totalEvents = events.eventCount;
      this.isLoading = false;
    })
  }

}
