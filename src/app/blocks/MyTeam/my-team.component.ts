import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import 'rxjs/add/operator/first';
import { CvService } from "../../services/cv.service";

@Component({
    selector: 'my-team',
    templateUrl: 'my-team.component.html',
    styleUrls: ['my-team.component.scss']
})

export class MyTeamComponent implements OnInit{

    public currentPersonNumber: number = null;
    public teamList: string[] = [];

    constructor(private _userService: UserService,
                private _cvService: CvService) {

    }


    public ngOnInit(): void {
        this._userService.user$
            .distinctUntilChanged()
            .subscribe((user) => {
                if (user) {
                    this.teamList = user.team;
                }
            });
    }

    public changePerson(index: number): void {
        if (index === this.currentPersonNumber) {
            this.currentPersonNumber = null;
            this._cvService.setCv(null);
        } else {
            this.currentPersonNumber = index;
            this._cvService.setCv(this.teamList[index]['username']);
        }
    }
}
