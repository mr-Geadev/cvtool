import { Component, OnInit } from '@angular/core';
import { UserService } from "./services/user.service";
import { CVTAuthService } from "./services/auth.service";

@Component({
    selector: 'cvt-root',
    templateUrl: './cvt.component.html',
    styleUrls: ['./cvt.component.scss']
})
export class CVTComponent implements OnInit {

    constructor(private _userService: UserService) {
    }

    public ngOnInit(): void {
        this._userService.getUser();
    }
}
