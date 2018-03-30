import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MaterializeModule } from 'angular2-materialize';
import { HeaderComponent, MyTeamComponent } from '../../blocks';
import { GuardService } from '../../services/guard.service';
import { CVPageComponent } from './cv-page.component';
import { CvService } from "../../services/cv.service";
import { CVFormModule } from "../../blocks/CVForm/CVForm.module";


@NgModule({
    declarations: [
        // blocks
        HeaderComponent,
        MyTeamComponent,
        CVPageComponent
    ],
    imports: [
        BrowserModule,
        MaterializeModule,
        ReactiveFormsModule,
        HttpClientModule,
        CVFormModule,
        RouterModule.forRoot([
            { path: '', component: CVPageComponent, pathMatch: 'full', canActivate: [GuardService] },
        ]),
    ],
    providers: [
        HttpClient,
        CvService
    ],
    bootstrap: [CVPageComponent]
})
export class CVPageModule {

}
