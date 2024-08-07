import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  name: string = "";
  email: string = "";
  password: string = "";
  address: string = "";
  phone: string = "";
  profilePicture: File | null = null;
  profilePicUrl: string | ArrayBuffer | null = null; // For image preview

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {}

  // Method to handle file selection and preview
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.profilePicture = input.files[0];

      // For previewing the image
      const reader = new FileReader();
      reader.onload = () => {
        this.profilePicUrl = reader.result;
      };
      reader.readAsDataURL(this.profilePicture);
    }
  }

  signUp() {
    if (!this.profilePicture) return;

    // Step 1: Get presigned URL
    this.authService.getPresignedUrl(this.email).subscribe(
      (response) => {
        const uploadUrl = response.uploadUrl;
        // const uploadUrl = "https://restaurant-explorer.s3.amazonaws.com/profile-pictures/rameezparkar21%40gmail.com.jpg?AWSAccessKeyId=ASIAWOOJJOO74BUVAOXC&Content-Type=image%2Fjpeg&Expires=1722845278&Signature=4ci6DVZx6LcvBCDKWAN4nh1%2FXh0%3D&X-Amzn-Trace-Id=Root%3D1-66b084d8-627b04990ecda40925a2a3c0%3BParent%3D7105931648206456%3BSampled%3D0%3BLineage%3D11f526e0%3A0&x-amz-security-token=IQoJb3JpZ2luX2VjEOj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIGXNscg%2FRtEP7NiN1FifRSOT3clE%2FsaguWfc5DUjPy8dAiEAwIsRh8%2B5kricSgZVvngDz%2FZdrJSThAib6YeM5hmX9OYqgwMI0f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARABGgw0NDMzNDA2NDk0MDciDDbRIX3Y0JhgZlzdNyrXAnorC2fccO1rAtVgFbP94uj4R%2BFtibfaGKc4%2BeuO0Hfg0s2%2BjqBjQ0iR7mXYELH2OJCvYJxoplJ5e5I4h6GsxCs3%2FUN4CsqwWTI3J68lA0Y4%2FylJQT1aBPGrXn7xRKZOCbGBVu6RW4OB63QRHclPU835%2FQwElyPElu5u0B6o2vN0pyHlggf3j3183QogdYssVGc5I2erpDmXH2HEC%2FQfuH60Q1mM%2FItULsTwWsfGP1HQTGkvuetqwVqW12ttFiJZ5uZYA%2Ban4KpI%2FDP%2Fhxgl3UlbgYPWen%2FFCO3KBdUGBEC4%2FxfL6XNjd2eVJROtNIYbqsk38S10UMFHWIkYBvBN795l4jErYM%2FxzoeP13os4MFReglGvtToQY7NkQa5BV2Nxeqr%2BR6fG76ex%2BjHThLYoK%2BOEzPUBkhaewNxsLznwFFT9T0hB7GL%2FxR8fcwlLfpte%2BJOV1y%2Bexkw2YnCtQY6ngGbRff8rj5xokaIIzplZvU81wFVSyOi4mw5aCpyqoZ3kKhNXE30zxH7a1lTcpqxf5jVb2jfh3XBUHArvlVEa9BJtpir%2FkJRKWGY1SnChNw87LBtSdG2PdV6VaFHxCIgzMyMAhcl9Zcc8vjFCa7hULGGbxK1gT%2FP6MFkI5LKH52g2E67ZR7K2%2FCNBvYhVV%2BBkNd5RanZQnLtbdKJSzLRkw%3D%3D";

        // Step 2: Upload profile picture to S3 using the presigned URL
        this.authService.uploadProfilePic(this.profilePicture as File, uploadUrl).subscribe(
          (response) => {
            console.log(response);
            // Step 3: Sign up the user with the profile picture URL
            const request = {
              name: this.name,
              email: this.email,
              password: this.password,
              address: this.address,
              phone: this.phone
            };
            this.authService.signUp(request).subscribe(
              (response) => {
                this.toastr.success(response.message, "Success");
                this.router.navigate(['signin']);
              },
              (error) => {
                this.toastr.error(error.error.error, "Error");
              }
            );
          },
          (error) => {
            this.toastr.error(error.error.error, "Error");
          }
        );
      },
      (error) => {
        this.toastr.error(error.error.error, "Error");
      }
    );
  }
}
