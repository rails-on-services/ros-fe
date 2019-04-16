import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  componentToRender: any;
  previousURL: string;
  modalOpen = false;

  constructor(public dialog: MatDialog,
              private router: Router,
              private route: ActivatedRoute) {
  }

  openDialog(): void {
    if (!this.modalOpen) {
      this.modalOpen = true;

      // route parent is not available in the callback, set absolute path
      const parentRoute = this.removeLastDirectoryPartOf(this.router.url);
      this.previousURL = parentRoute;

      if (this.componentToRender == null) {
        console.log('component for modal not found');
        return;
      }
      const dialogRef = this.dialog.open(this.componentToRender, {
        width: '50vw',
        data: {}
      });
      dialogRef.afterClosed().subscribe(result => {
        this.modalOpen = false;
        this.router.navigate([this.previousURL], {relativeTo: this.route});

      });
    }
  }

  removeLastDirectoryPartOf(url) {
    let arr: string[];
    if (url !== '/') {
      arr = url.split('/');
      arr.pop();
      return (arr.join('/'));
    }
    return url;
  }

}



