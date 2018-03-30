import { Component, OnDestroy, OnInit } from '@angular/core';
import 'rxjs/add/operator/distinctUntilChanged';
import { TITLE } from '../../constants/app-info.constant';
import { UserModel } from '../../models/user.model';
import { CVTAuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Router } from "@angular/router";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, OnDestroy {


    public currentUser: UserModel = null;
    public TITLE: string = TITLE;
    private _subscription: any;
    public version: string = '';

    constructor(private _userService: UserService,
                private _CVTAuthService: CVTAuthService,
                private _router: Router) {
    }

    public ngOnInit() {
        this._subscription = this._userService.user$
            .distinctUntilChanged()
            .subscribe((user: any) => {
                this.currentUser = user;
            });

        this.version = window['cvtool_version'];
    }

    public ngOnDestroy() {
        this._subscription.unsubscribe();
    }

    public signOut(): void {
        this._CVTAuthService.signOut();
        this._router.navigate(['auth']);
        this._userService.setUser({});
    }


}
