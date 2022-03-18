import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  constructor(private snackbar: MatSnackBar) { }

  ngOnInit(): void {
  }

  email: string = "";

  disableDelete: boolean = true;

  deleteAccount(): void {
    this.snackbar.open("Info", "Delete account", { duration: 3000 });
  }
}
