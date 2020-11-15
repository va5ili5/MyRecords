import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Subscription } from 'rxjs';
import { User } from 'src/app/domain/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  onRegister(form: NgForm) {
    const user: User = {
      email: form.value.email,
      username: form.value.username,
      password: form.value.password,
      firstname: form.value.firstname,
      lastname: form.value.lastname
    }
    if (form.invalid) {
      return;
    }
    //this.isLoading = true;
    this.authService.registerUser(user);
  }

}
