import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {

  username: String = '';
  password: String = '';
  showErrorLogin: Boolean = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() { }

  onSubmit() {
    this.userService.login(this.username, this.password).subscribe(
      user => this.router.navigateByUrl('films'),
      err => {
        this.password = '';
        this.showErrorLogin = true;
      }
    );
  }


}
