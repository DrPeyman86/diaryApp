import { Injectable } from '@angular/core';
import { Event } from './events.model';
import { HttpClient } from '@angular/common/http';//import the httpclient to components or services in this case that you want the backend to communicate with
import { Router } from '@angular/router';//router provides tool to the service so that when certain methods are finisehd, you can re-route the page to different pages
import { environment } from '../environments/environment';
import { strictEqual } from 'assert';


const BACKEND_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})

export class EventsService {
  private event: Event[] = [];


  constructor(private http: HttpClient, private router: Router){}


  addEvent(eventType: string, eventDate: any, eventName: string, eventComment: string, image: File = null) {
    var eventData = new FormData();
    console.log(eventType + ' ' + eventDate + ' ' + eventName)
    eventData.append("eventType", eventType)
    eventData.append("eventDate", eventDate)
    eventData.append("eventName", eventName)
    eventData.append("eventComment", eventComment)
    eventData.append("image", <File>image, eventName)
    // const eventData = {
    //   eventType: eventType,
    //   eventDate: eventDate,
    //   eventName: eventName,
    //   eventComment: eventComment
    // }

    // eventData.forEach(record=>{
    //   console.log(record);
    // });
    //console.log(eventData.getAll("eventType"));
    return this.http.post<{message: string, event: Event}>(BACKEND_URL + '/newEvents', eventData)
    //   .subscribe((responseData)=>{
    //     console.log(responseData);
    // })
  }

  getEvents(eventPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${eventPerPage}&currentPage=${currentPage}`;
    return this.http.get<{message: string, content: any}>(BACKEND_URL + '/pastEvents' + queryParams)
  }

}
