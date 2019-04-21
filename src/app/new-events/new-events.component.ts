import { Component, OnInit } from '@angular/core';

//required for reactive Forms control
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { EventsService } from '../events-service';

declare function newEventComponent(): any;

@Component({
  selector: 'app-new-events',
  templateUrl: './new-events.component.html',
  styleUrls: ['./new-events.component.css']
})
export class NewEventsComponent implements OnInit {
  eventTypes = ['Good','Argument','Thought','Event'];
  isLoading = false;

  form: FormGroup;

  constructor(private eventsService: EventsService) { }

  ngOnInit() {
    newEventComponent();
    this.form = new FormGroup({
      'eventType': new FormControl("", {
        validators: [Validators.required]
      }),
      'eventDate': new FormControl(null, {
        validators: [Validators.required]
      }),
      'eventName': new FormControl(null,{
        validators: [Validators.required, Validators.minLength(3)]
      }),
      'eventComments': new FormControl(null, {
        validators: [Validators.required, Validators.minLength(10)]
      })
    })

  }

  onSaveEvent() {
    this.isLoading = true;

    console.log(this.form);

    this.eventsService.addEvent(this.form.value.eventType, this.form.value.eventDate, this.form.value.eventName, this.form.value.eventComments)
    .subscribe((response)=>{
      console.log(response);
      this.form.reset();
      this.isLoading = false;
    })

    //console.dir(this.form);

  }


}
