import { HttpClient } from '@angular/common/http';
import { Injectable, Injector} from '@angular/core';
import 'rxjs/add/operator/first';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { UserModel } from '../models/user.model';
import { CVTAuthService } from "./auth.service";

@Injectable()
export class UserService {


    public userSubject: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(null);
    public user$: Observable<any> = this.userSubject.asObservable();

    constructor(public _http: HttpClient,
                private _CVTAuthService: CVTAuthService) {
    }

    public setUser(user: any): void {
        this.userSubject.next(new UserModel(user));
    }

    public getUser(): void {
        if (this._CVTAuthService.token) {
            this._http.get(environment.endpointUrl + `/me?username=${this._CVTAuthService.token}`)
                .subscribe(
                    (res) => {
                        this.setUser(res);
                    }
                    // (err) => alert('Error of response')
                );
        };
    }


}
