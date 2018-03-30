import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { CvModel } from '../models/cv.model';
import { CVTAuthService } from './auth.service';
import { Subject } from 'rxjs/Subject';

declare var Materialize: any;

@Injectable()
export class CvService {

    public activeCv: Subject<string> = new Subject<string>();


    constructor(private _http: HttpClient,
                private _CVTAuthService: CVTAuthService) {
        this.setCv(null);
    }

    public setCv(data: string) {
        this.activeCv.next(data);
    }


    public getCV(id?: string): Observable<CvModel> {
        if (id) {
            return this._http.get(environment.endpointUrl + `/cv?username=${id}`)
                .map(
                    (res) => new CvModel(res['cv'])
                )
                .catch((err) => {
                    console.log(err);
                    Materialize.toast('The user has not filled in information about himself yet', 4000);
                    return Observable.of(new CvModel({}));
                });
        } else {
            return this._http.get(environment.endpointUrl + `/cv?username=${this._CVTAuthService.token}`)
                .map(
                    (res) => new CvModel(res['cv'])
                )
                .catch((err) => {
                    console.log(err);
                    Materialize.toast('You havn’t filled CV yet', 4000);
                    return Observable.of(new CvModel({}));
                });

        }
    }

    public postCv(sendableForm: any, id: string): Observable<CvModel> {
        sendableForm.techSkills = sendableForm.techSkills.split(';');
        sendableForm.projectExperienceList.forEach((exp) => {
            exp.techSkills = exp.techSkills.toString().split(';');
            exp.techSkills.forEach((item) => item.trim());
        });

        return this._http.post(environment.endpointUrl + `/cv?username=${id}`, sendableForm)
            .map(
                (res) => new CvModel(res)
            )
            .catch( (err) => {
                console.log(err);
                Materialize.toast('Something went wrong', 4000);
                return Observable.of(new CvModel({}));
            });
    }
}
