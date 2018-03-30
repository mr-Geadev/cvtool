import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MaterializeModule } from 'angular2-materialize';

import { RouterModule } from '@angular/router';
import { AuthPageComponent } from './auth-page.component';


@NgModule({
    declarations: [
        AuthPageComponent,
    ],
    imports: [
        BrowserModule,
        MaterializeModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule.forRoot([
            { path: 'auth', component: AuthPageComponent, pathMatch: 'full' },
        ]),
        // blocks
    ],
    providers: [
        HttpClient,
    ],
    bootstrap: [AuthPageComponent]
})
export class AuthPageModule {

}
