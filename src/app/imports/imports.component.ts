import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpEventType, HttpEvent } from '@angular/common/http';
import { ImportsService } from '../imports/imports.service';

@Component({
  selector: 'app-imports',
  templateUrl: './imports.component.html',
  styleUrls: ['./imports.component.css']
})
export class ImportsComponent implements OnInit {

  files: Set<File>;
  progress = 0;

  constructor(private service: ImportsService) { }

  ngOnInit() { }

  onChange(event) {
    console.log(event);

    const selectedFiles = <FileList>event.srcElement.files;
    // document.getElementById('customFileLabel').innerHTML = selectedFiles[0].name;

    const fileNames = [];
    this.files = new Set();
    for (let i = 0; i < selectedFiles.length; i++) {
      fileNames.push(selectedFiles[i].name);
      this.files.add(selectedFiles[i]);
    }
    document.getElementById('customFileLabel').innerHTML = fileNames.join(', ');

    this.progress = 0;
  }

  onUpload(): void {
    if (this.files && this.files.size > 0) {
      this.service.upload(this.files)
        .subscribe((event: HttpEvent<Object>) =>  {
          console.log(event);
          if(event.type == HttpEventType.Response){
            console.log('Upload Concluido');

          }else if(event.type == HttpEventType.UploadProgress){
            const percentDone = Math.round((event.loaded * 100)/ event.total);
            console.log('Progresso', percentDone);
            this.progress = percentDone;
          }
        });
    }
  }
}
