import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StorageService } from '@perx/open-services';
import { MatHorizontalStepper } from '@angular/material';
@Component({
  selector: 'app-new-file',
  templateUrl: './new-file.component.html',
  styleUrls: ['./new-file.component.scss']
})
export class NewFileComponent implements OnInit {
  @ViewChild(MatHorizontalStepper) stepper: MatHorizontalStepper;

  public files: NgxFileDropEntry[] = [];
  filePreview: string | ArrayBuffer;
  fileContents: object[] = [];
  fileDetailsForm: FormGroup;
  isEditable: boolean = true;
  multiple: boolean = false;
  isImgFile: boolean = false;
  isTextFile: boolean = false;
  checkTNCStatus: boolean = false;
  textType: string = '^.+\.(xlsx|xls|csv)$';
  imgType: RegExp = /imag.*/;

  // tslint:disable-next-line: typedef
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
    private storageService: StorageService
  ) {
  }

  ngOnInit(): void {
    this.fileDetailsForm = new FormGroup({
      services: new FormControl('', [Validators.required]),
      fileType: new FormControl('', [Validators.required]),
      agreeTNC: new FormControl('', [Validators.required]),
    });
  }
  public mergeArrayIntoObject(header: string[], rows: string[][]): {}[] {
    return rows.map(row =>
      row.reduce((res, field, index) => {
        res[header[index]] = field;
        return res;
      }, {})
    );
  }

  public splitRowContent(content: string): string[] {
    return content.replace(/(;|,|\t)/gm, ',').split(',');
  }

  public dropped(files: NgxFileDropEntry[]): void {
    this.files = this.multiple ? [...this.files, ...files] : files;

    // tslint:disable-next-line: no-console
    console.time('dropped');
    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        const reader = new FileReader();

        fileEntry.file((file: File) => {
          this.storageService.uploadFile(file).subscribe(data => {
            console.log(data);
          });
          if (file.type.match(this.textType) || file.name.match(this.textType)) {
            this.isImgFile = false;
            this.isTextFile = true;
            reader.readAsText(file);
          } else if (file.type.match(this.imgType)) {
            this.isImgFile = true;
            this.isTextFile = false;
            reader.readAsDataURL(file);
          }

          this.transformFileDataWhenReaderOnload(reader);
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(fileEntry);
      }
    }
    // tslint:disable-next-line: no-console
    console.timeEnd('dropped');
  }

  public transformFileDataWhenReaderOnload(reader: FileReader): void {
    reader.onload = () => {
      this.filePreview = reader.result;
      this.updateFileContentsForCSVFile();
    };
  }

  public updateFileContentsForCSVFile(): any {
    if (!this.isTextFile) {
      return null;
    }

    const resultByLines = this.filePreview.toString().replace(/(\r|\n)/gm, '\n').split('\n');

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

  public toggleSelectedServices(value: string): void {
    this.selectedServices = this.SignaturesMapping[value];
    this.selectedSignature = {};
  }

  public toggleSelectedSignatures(value: string): void {
    this.selectedSignature = Object.assign({}, this.selectedServices[value]);
  }

  public onChange(event: any): void {
    this.dropped(event.file);
  }

  public fileOver(event: any): void {
    console.log(event);
  }

  public fileLeave(event: any): void {
    console.log(event);
  }
  cancelClicked(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  updateSignatureMapping(): void {
    console.log(this.selectedSignature);
  }

  updateSignatureMappingField($event: any): void {
    this.selectedSignature[$event.target.id] = $event.target.value;
  }

  setCheckTNCStatus(): void {
    this.checkTNCStatus = true;
    if (this.fileDetailsForm.get('agreeTNC').valid && this.files.length > 0) {
      this.stepper.next();
    }
  }

  goToFilesList(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
