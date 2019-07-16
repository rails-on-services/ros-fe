import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageDatastore } from './storage-datastore.service';
import { Observable, of } from 'rxjs';
import { StorageFile } from './models/storage.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  storageEndpoint: string;
  httpHeaders: HttpHeaders;

  constructor(
    private http: HttpClient,
    private datastore: StorageDatastore
  ) {
    this.datastore.headers = new HttpHeaders({
      Authorization: 'Basic AGJRMHJCIQLEQDRZJGJE:9TLqz-KM47M-ySPLDCmrxuv7l1VYj-y81zqkT_at8AvgaMNXf2wJ9g'
    });
    this.httpHeaders = new HttpHeaders({
      // 'Content-Type': 'multipart/form-data',
      Authorization: 'Basic AGJRMHJCIQLEQDRZJGJE:9TLqz-KM47M-ySPLDCmrxuv7l1VYj-y81zqkT_at8AvgaMNXf2wJ9g'
    });
    this.storageEndpoint = 'http://d853ad1a.ngrok.io/storage/files';
  }

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    // const options = { headers, responseType: 'blob' as 'json'  };
    const options = { headers: this.httpHeaders };

    return this.http.post(this.storageEndpoint, formData, options);
  }

  fetchFiles(force?: boolean): Observable<StorageFile[]> {
    if (!force) {
      const files = this.datastore.peekAll(StorageFile);
      if (files && files.length > 0) {
        return of(files);
      }
    }
    const params = {
      page: { size: 10, number: 1 }
    };
    return this.datastore.findAll(
      StorageFile,
      {
        ...params,
      }
    ).pipe(
      map(document => document.getModels())
    );
  }

  fetchFile(id: number|string, force?: boolean): Observable<StorageFile> {
    if (!force) {
      const file = this.datastore.peekRecord(StorageFile, `${ id }`);
      if (file) {
        return of(file);
      }
    }
    return this.datastore.findRecord(StorageFile, `${ id }`);
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
