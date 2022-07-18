import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectionListChange } from '@angular/material/list';
import { Router } from '@angular/router';
import info from 'package.json';

interface DashboardItem {
  label: string;
  value: string;
  header?: string;
}

const ITEMS: DashboardItem[] = [
  { label: 'My Account', value: 'account', header: 'Cloud77 Account' },
  { label: 'Reset Password', value: 'password' },
  { label: 'Json Editor', value: 'editor' },
  { label: 'Orders', value: 'orders' },
  { label: 'Setting', value: 'setting' }
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  cardHeader = 'unknown';

  selectedItem: DashboardItem = ITEMS[0];
  items = ITEMS;

  name?: string | null = '';
  email?: string  | null = '';
  role?: string | null = '';

  active = '';

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  title = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router) {}

  ngOnInit(): void {
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    this.title = `Cloud77 Web (v${info.version})`;
    document.title = 'Cloud77 Dashboard';

    this.name = sessionStorage.getItem('name');
    this.email = sessionStorage.getItem('email');
    this.role = sessionStorage.getItem('role');
  }

  onSelectionChange(event: MatSelectionListChange): void
  {
    const item = this.items.find(i => i.value === event.options[0].value);
    if (item) {
      this.selectedItem = item;
    }
  }

  onLogoutClick(): void
  {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
