import { AbstractControl } from '@angular/forms';
import { Observable, Observer, of } from 'rxjs';

export const mimeTypeImg = (control: AbstractControl): Promise<{[key: string]: any}> | Observable<{[key: string]: any}> => {
  //if the value of th field is a string meaning the image file exists on the server, so we are updating an existing
  //record it would enter here because the value of the field would be the path of the image stored in server, so
  //it would just be a string
  if (typeof(control.value) === 'string') {
    return of(null);//of returns an observable which is what we want to send back and emits an event
  }

  const file = control.value as File;//tell .TS that it is a file type by doing "as File" which is just casting it
  const fileReader = new FileReader();

  const fileReaderObs = Observable.create((observer: Observer<{[key: string]: any}>)=>{
    fileReader.addEventListener("loadend", () => {
      //this function inside will run after fileReader.readAsArrayBuffer(). this is the callback so now you can validate the mime type inside here and return
      //Uint8Array will create an array of 8 unsite integers. this basically allows us to read certain patters in the file. not just the file name, but also the file
      //metadata, that we can use to parse the mimetype. we don't just want to check the file extension since that could be changed, since you can upload a PDF as a JPG file
      //we want to look into that file and Uint8Array allows us to do this.
      const arr = new Uint8Array(<ArrayBuffer>fileReader.result).subarray(0,4);//subarray(0,4) is the mimeType
      let header = '';
      let isValid = false; //we will assume at first the file is invalid. so we should set to true eventually if the file is of a mimetype we are looking for

      //need to read a certain patter from the arr, and you would use a for loop for that
      for (let i = 0; i < arr.length; i++) {
          header += arr[i].toString(16);//toString(16) will convert the string to a hexadecimal string
      }
      //these hexadecimal strings can be googled ofr mimetypes. these mimetype patterns are jpg and png filetypes exactly.
      switch (header) {
          case "89504e47":
              isValid = true;
              break;
          case "ffd8ffe0":
          case "ffd8ffe1":
          case "ffd8ffe2":
          case "ffd8ffe3":
          case "ffd8ffe8":
              isValid = true;
              break;
          default:
              isValid = false
              break;
      }
      if (isValid) {
          //next() emits a new value
          observer.next(null);//a null valid emitted means the validator returned valid with no error code
      } else {
          observer.next({invalidMimeType: true});//you would emit a different value of an JS object which you can name whatever you want, which would mean it was not valid
      }
      observer.complete();//.complete() would let any subscribers know this observable has finished processing.
    });
    fileReader.readAsArrayBuffer(file);
  })

  return fileReaderObs;//return the observable



}
