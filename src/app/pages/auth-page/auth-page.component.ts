import { Component } from '@angular/core';
import { TITLE } from '../../constants/app-info.constant';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CVTAuthService } from '../../services/auth.service';
import { AuthService } from 'angular4-social-login';

@Component({
    selector: 'auth-page',
    templateUrl: './auth-page.component.html',
    styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent {

    public TITLE: string = TITLE;

    constructor(private _router: Router,
                private _CVTAuthService: CVTAuthService,
                private _userService: UserService,
                private _authService: AuthService) {

        if (this._CVTAuthService.token) {
            this._router.navigate(['']);
        }
    }

    public signIn() {
        this._CVTAuthService.signIn();

        this._authService.authState
            .subscribe((user) => {
                if (user) {
                    this._router.navigate(['']);
                    this._userService.getUser();
                }
            });
    }
}

