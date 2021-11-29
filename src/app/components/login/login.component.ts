import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AuthApiService } from 'src/app/services/api_end_points/auth_api.service';
import { LRespose } from 'src/app/models/l_response';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  invalidCredentials: boolean = false;
  showLoadingButton: boolean = false;

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService, private _apiService: AuthApiService) { }

  get f() { return this.loginForm.controls; }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['dashboard']);
    }
  }


  onSubmit(): void {
    if (!this.loginForm.valid || this.showLoadingButton) return;

    const formData = this.loginForm.value;
    this.showLoadingButton = true;
    this._apiService.login({ email: formData.email, pwd: formData.password }).subscribe((response: LRespose) => {
      this.invalidCredentials = false
      if (response.status == 'success') {
        localStorage.setItem('token', 'qwerty12345');
        this.router.navigate(['dashboard']);
      } else {
        this.invalidCredentials = true;
      }
      this.showLoadingButton = false;
      this.loginForm.reset();
    });
  }

}
