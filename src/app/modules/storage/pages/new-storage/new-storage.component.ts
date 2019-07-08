import { Component } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-new-storage',
  templateUrl: './new-storage.component.html',
  styleUrls: ['./new-storage.component.scss']
})
export class NewStorageComponent {
  public files: NgxFileDropEntry[] = [];
  imagePrivew: string | ArrayBuffer;
  public dropped(files: NgxFileDropEntry[]) {
    this.files = [...this.files, ...files];
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        const reader = new FileReader();

        fileEntry.file((file: File) => {
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.imagePrivew = reader.result;
            };
        });
        // fileEntry.file((file: File) => {

          // Here you can access the real file
          // console.log(droppedFile.relativePath, file);
          /**
          // You could upload it like this:
          const formData = new FormData()
          formData.append('logo', file, relativePath)

          // Headers
          const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })

          this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
          .subscribe(data => {
            // Sanitized logo returned from backend
          })
          **/

        // });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }
  public onChange(event) {
    this.dropped(event.file);
  }

  public fileOver(event){
    console.log(event);
  }

  public fileLeave(event){
    console.log(event);
  }
}
