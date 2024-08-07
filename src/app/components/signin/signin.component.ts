import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {}

  email: string = "";
  password: string = "";

  signIn() {
    const request = {
      email: this.email,
      password: this.password
    };
    
    this.authService.signIn(request).subscribe((response) => {
      this.toastr.success(response.message, "Success");
      sessionStorage.setItem("token", response.token);
      sessionStorage.setItem("email", response.email);
      sessionStorage.setItem("profilePictureUrl", response.displayUrl);
      this.router.navigate(['results']);
    }, (error) => {
      this.toastr.error(error.error.error, "Error")
    });
  }

}
