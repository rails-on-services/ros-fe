import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageDatastore } from './storage-datastore.service';
import { StorageFile } from './models/storage.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  storageEndpoint: string;

  constructor(
    private http: HttpClient,
    private datastore: StorageDatastore
  ) {
    this.datastore.headers = new HttpHeaders({
      Authorization: 'Basic AGJRMHJCIQLEQDRZJGJE:9TLqz-KM47M-ySPLDCmrxuv7l1VYj-y81zqkT_at8AvgaMNXf2wJ9g'
    });
    this.storageEndpoint = 'http://7339f4c0.ngrok.io/storage/';
  }

  uploadFile(file: File, filePath?: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, filePath);

    const headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data',
      Authorization: 'Basic AGJRMHJCIQLEQDRZJGJE:9TLqz-KM47M-ySPLDCmrxuv7l1VYj-y81zqkT_at8AvgaMNXf2wJ9g'
    });
    const options = { headers, responseType: 'blob' as 'json'  };

    return this.http.post(this.storageEndpoint, formData, options);
  }

  // TODO, didn't find a good way for using json api for file upload
  // createFile(file: File): Observable<any> {
  //   const newFile = this.datastore.createRecord(
  //     File,
  //     {
  //       file
  //     }
  //   );

  //   return newFile.save();
  // }

  // TODO, need to figure out the format for getting all signatures from API
}
