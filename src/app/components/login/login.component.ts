import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  invalidCredentials: boolean = false;

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) { }

  get f() { return this.loginForm.controls; }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['dashboard']);
    }
  }


  onSubmit(): void {
    if (!this.loginForm.valid) return;

    const formData = this.loginForm.value;
    if (formData.email == 'naac@gmail.com' && formData.password == '1234') {
      this.invalidCredentials = false
      localStorage.setItem('token', 'qwerty12345');
      this.router.navigate(['dashboard']);
    } else {
      this.invalidCredentials = true;
    }
    this.loginForm.reset();
  }

}
