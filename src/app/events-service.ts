import { Injectable } from '@angular/core';
import { Event } from './events.model';
import { HttpClient } from '@angular/common/http';//import the httpclient to components or services in this case that you want the backend to communicate with
import { Router } from '@angular/router';//router provides tool to the service so that when certain methods are finisehd, you can re-route the page to different pages
import { environment } from '../environments/environment';


const BACKEND_URL = environment.apiURL + '/newEvents';

@Injectable({
  providedIn: 'root'
})

export class EventsService {
  private event: Event[] = [];


  constructor(private http: HttpClient, private router: Router){}


  addEvent(eventType: string, eventDate: any, eventName: string, eventComment: string) {
    /*const eventData = new FormData();
    eventData.append("eventType", eventType)
    eventData.append("eventDate", eventDate)
    eventData.append("eventName", eventName)
    eventData.append("eventComment", eventComment)*/
    const eventData = {
      eventType: eventType,
      eventDate: eventDate,
      evetName: eventName,
      eventComment: eventComment
    }

    // eventData.forEach(record=>{
    //   console.log(record);
    // });

    this.http.post<{message: string, event: Event}>(BACKEND_URL, eventData)
      .subscribe((responseData)=>{
        console.log(responseData);
    })
  }

}
