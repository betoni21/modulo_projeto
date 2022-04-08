import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImportsService {

  constructor(private http: HttpClient) { }
  upload(files: Set<File>){

    const formData = new FormData();
    files.forEach(file => formData.append('file', file, file.name));

    return this.http.post('http://localhost:8000/api/upload', formData, {
      observe: 'events',
      reportProgress: true
    })
  }
}
