import { Component, OnInit } from '@angular/core';

//required for reactive Forms control
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { EventsService } from '../events-service';
import { mimeTypeImg } from '../mime-type.validator.img';

//import { Event } from '../models/events'

//declare function newEventComponent(): any;

@Component({
  selector: 'app-new-events',
  templateUrl: './new-events.component.html',
  styleUrls: ['./new-events.component.css']
})
export class NewEventsComponent implements OnInit {
  eventTypes = ['Good','Argument','Thought','Event','At Fault'];
  //public events: Event;
  isLoading = false;
  imagePreview: string;

  form: FormGroup;

  constructor(private eventsService: EventsService, fb: FormBuilder) {
    this.form = fb.group({
      hideRequired: false,
      floatLabel: 'auto'
    });
   }

  ngOnInit() {
    // newEventComponent();
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
      }),
      'image': new FormControl(null,{},[mimeTypeImg])
    })

  }

  onImagePicked(event: Event) {
    //not having the (as HTMLInputElement) will not work since event.target.files does not know that the target field is an input field.
    //so you use (as HTMLInputElement) to convert the event.target to whatever you have after "as" and then you can access the .files property
    const file = (event.target as HTMLInputElement).files[0];//files is an array of files so take the first element of that array
    //console.log(file);
    //this.form.patchValue sets only 1 control you define.
    //so here you are setting the image control to the file object. the file object is not just a text, it is the javascript file object.
    this.form.patchValue({'image': file});
    this.form.get('image').updateValueAndValidity();//this tells the form to re-evaluate the 'image' control and update it's validity on the page. so if the field was
    //coming back as invalid before this function, you would want to tell angular to re-evaluate it so that the invalid error would go away.
    //console.log(file);
    //console.log(this.form)

    //FileReader() will allow you to read a file. it is a constructor so you would have to instantiate it
    const reader = new FileReader();

    //execute a function when the dom is done loading a resource that was attached. this will get called when it's done reading a file
    //this is an async code, which is why we have the callback, so when the reader class is instantitated, this function will get called as the callback function
    reader.onload = () => {
      //type casting, tell reader.result is a string so that it can be assigned to imagePreview which is a string.
      this.imagePreview = <string>reader.result;
    }
    //this tells reader to actually load the file. so the function above can kick off
    reader.readAsDataURL(file);
  }

  onSaveEvent() {
    console.log(this.form);
    if(this.form.invalid){
      return false;
    }
    this.isLoading = true;

    //console.log(this.form);

    this.eventsService.addEvent(this.form.value.eventType, this.form.value.eventDate, this.form.value.eventName, this.form.value.eventComments, this.form.value.image)
    .subscribe((response)=>{
      console.log(response);
      this.form.reset();
      this.isLoading = false;
    })

    //console.dir(this.form);

  }


}
