import { Component, OnInit } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { FormsModule } from '@angular/forms';


import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  nombreUser:string="";
  password:string="";

  constructor(private authService: AuthenticationService, private router: Router) {}

  ngOnInit() {}

  onSubmit() {
    this.authService.login(this.nombreUser, this.password)
      .subscribe(
        () => {
          // Login successful, redirect to home page
          this.router.navigate(['/dashboard']);
        }
      );
  }
}
