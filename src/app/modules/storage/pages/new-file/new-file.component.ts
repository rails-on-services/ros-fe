import { Component, OnInit } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-new-file',
  templateUrl: './new-file.component.html',
  styleUrls: ['./new-file.component.scss']
})
export class NewFileComponent implements OnInit {
  public files: NgxFileDropEntry[] = [];
  filePreview: string | ArrayBuffer;
  fileContents: object[] = [];
  fileDetailsForm: FormGroup;
  isEditable = true;
  multiple = false;
  isImgFile = false;
  isTextFile = false;
  checkTNCStatus = false;
  textType = '^.+\.(xlsx|xls|csv)$';
  imgType = /imag.*/;

  SignaturesMapping = {
    cognito: {
      user: {
        firstName: 'firstName',
        lastName: 'lastName'
      },
      audience: {
        firstName: 'firstName',
        lastName: 'lastName'
      },
      pool: {
        firstName: 'firstName',
        lastName: 'lastName',
        pool: 'pool'
      }
    },
    comms: {
      events: {
        eventName: 'eventName',
        eventStartDate: 'eventStartDate',
        eventEndDate: 'eventEndDate'
      },
      rewards: {
        rewardName: 'rewardName',
        eventStartDate: 'eventStartDate',
        eventEndDate: 'eventEndDate'
      }
    },
    IAM: {
      user: {
        firstName: 'firstName',
        lastName: 'lastName'
      },
      group: {
        firstName: 'firstName',
        lastName: 'lastName',
        group: 'group'
      }
    }
  };

  selectedServices: object;
  selectedSignature: object = {};
  columnProperties: object[];
  tableHeader: string[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
  }

  ngOnInit() {
    this.fileDetailsForm = new FormGroup({
      services: new FormControl('', [Validators.required]),
      fileType: new FormControl('', [Validators.required]),
      agreeTNC: new FormControl('', [Validators.required]),
    });
  }
  public mergeArrayIntoObject(header: string[], rows: string[][]) {
    return rows.map(row =>
      row.reduce((res, field, index) => {
        res[header[index]] = field;
        return res;
      }, {})
    );
  }

  public splitRowContent(content: string) {
    return content.replace(/(;|,|\t)/gm, ',').split(',');
  }
  public dropped(files: NgxFileDropEntry[]) {
    this.files = this.multiple ? [...this.files, ...files] : files;

    // tslint:disable-next-line: no-console
    console.time('dropped');
    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        const reader = new FileReader();

        fileEntry.file((file: File) => {
          if (file.type.match(this.textType) || file.name.match(this.textType)) {
            this.isImgFile = false;
            this.isTextFile = true;
            reader.readAsText(file);
          } else if (file.type.match(this.imgType)) {
            this.isImgFile = true;
            this.isTextFile = false;
            reader.readAsDataURL(file);
          }

          reader.onload = () => {
            this.filePreview = reader.result;
            if (this.isTextFile) {
              const newFileResult = this.filePreview.toString().replace(/(\r|\n)/gm, '\n');
              const resultByLines = newFileResult.split('\n');
              this.tableHeader = this.splitRowContent(resultByLines.shift());
              this.columnProperties = this.tableHeader.map(header => ({
                key: header,
                name: header,
                sortable: true,
                display: true
              }));

              const resultByCell = resultByLines.map(lineContent => {
                return this.splitRowContent(lineContent);
              });
              this.fileContents = this.mergeArrayIntoObject(this.tableHeader, resultByCell);
            }
          };
        });
        fileEntry.file((file: File) => {

          const formData = new FormData();
          formData.append('file', file, droppedFile.relativePath);

          const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Basic AGJRMHJCIQLEQDRZJGJE:9TLqz-KM47M-ySPLDCmrxuv7l1VYj-y81zqkT_at8AvgaMNXf2wJ9g'
          });
          const options = { headers, responseType: 'blob' as 'json' };



          this.http.post('http://7339f4c0.ngrok.io/storage/uploads', formData, options)
            .subscribe(data => {
              console.log(data);
            });
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
    // tslint:disable-next-line: no-console
    console.timeEnd('dropped');
  }

  public toggleSelectedServices(value) {
    this.selectedServices = this.SignaturesMapping[value];
    this.selectedSignature = {};
  }

  public toggleSelectedSignatures(value) {
    this.selectedSignature = Object.assign({}, this.selectedServices[value]);
    // this.fileDetailsForm = new FormGroup({
    //   targetType: new FormControl('', [Validators.required]),
    // });
    // this.fileDetailsForm.get('targetType').setValue(value);
    // this.selectedSignature.forEach(field => {
    //   this.fileDetailsForm.addControl(field, new FormControl(''));
    // });
  }

  public onChange(event) {
    this.dropped(event.file);
  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }
  cancelClicked() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  updateSignatureMapping() {
    console.log(this.selectedSignature);
  }

  updateSignatureMappingField($event) {
    this.selectedSignature[$event.target.id] = $event.target.value;
  }

  setCheckTNCStatus() {
    this.checkTNCStatus = true;
  }
}
