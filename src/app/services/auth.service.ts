import { Injectable } from '@angular/core';
import { AuthService, GoogleLoginProvider } from "angular4-social-login";

const TOKEN = 'token';

@Injectable()
export class CVTAuthService {

    public token: string = null;

    constructor(private authService: AuthService) {
        this.token = window.localStorage.getItem(TOKEN || null);

        this.authService.authState.subscribe((user) => {
            if (user) {
                this._setToken(user.email.substring(0, user.email.indexOf('@')));
            }
        });

    }

    public signIn(): any {
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }

    public signOut(): void {
        this.authService.signOut();
        this.token = null;
        window.localStorage.removeItem(TOKEN);
    }

    private _setToken(token) {
        window.localStorage.setItem(TOKEN, token);
        this.token = token;
    }

}
