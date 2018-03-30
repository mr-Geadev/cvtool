import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { UserModel } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'cv-page',
    templateUrl: './cv-page.component.html',
    styleUrls: ['./cv-page.component.scss']
})
export class CVPageComponent implements OnInit, OnDestroy{

    public currentUser: UserModel;
    private _subscription: Subscription[] = [];

    constructor(private _userService: UserService) {
    }

    public ngOnInit() {
        this._subscription =  [
            this._userService.user$
                .subscribe(user => this.currentUser = user)
        ];
    }

    public ngOnDestroy() {
        this._subscription.forEach(s => s.unsubscribe());
    }

}
