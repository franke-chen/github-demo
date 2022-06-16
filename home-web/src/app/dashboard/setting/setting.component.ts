import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SNACKBAR_DURATION } from 'src/environments/environment';
import { SettingService } from './setting.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css'],
  providers: [SettingService]
})
export class SettingComponent implements OnInit {

  emailConfirm = '';
  email = '';
  userId = -1;
  role = '';
  disableDelete = true;

  authorName = '';
  authorTitle = '';

  constructor(private snackbar: MatSnackBar, private router: Router, private service: SettingService) { }

  ngOnInit(): void {
    this.service.tokenCheck().then(account => {
      console.log('page can init');
      if (account) {
        console.log(account);
        this.email = account.email;
        this.userId = account.userId;
        this.role = account.role;
      }
    }, err => {
      console.error(err);
      console.log('page can not init');
      this.router.navigate(['/login']);
    });
  }

  emailChange(): void {
    this.disableDelete = !(this.emailConfirm.toLowerCase() === this.email);
  }

  deleteAccount(): void {
    this.delete().then(() => {
      this.snackbar.open('Info', 'Delete account', { duration: SNACKBAR_DURATION });
      setTimeout(() => {
        this.router.navigate(['']);
      }, SNACKBAR_DURATION + 1000);
    });
  }

  async delete(): Promise<void> {

    await this.service.deleteDevices(this.email, this.userId);

    await this.service.deleteProfile(this.email, this.userId);

    await this.service.deleteLicense(this.email, this.userId);

    await this.service.deleteAccount(this.email, this.userId);
  }


  postAuthor(): void {
    if (this.authorName && this.authorTitle) {
      this.service.postAuthor(this.authorName, this.authorTitle);
    } else {
      alert('empty');
    }

  }

  getProducts(): void {
    this.service.getProducts().then(res => {
      console.log(res);
    });
  }

  getAuthors(): void {
    this.service.getAuthors().then(res => {
      console.log(res);
    });
  }
}
