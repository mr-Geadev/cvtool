import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { MaterializeModule } from 'angular2-materialize';

import { SocialLoginModule, AuthServiceConfig } from 'angular4-social-login';
import { GoogleLoginProvider } from 'angular4-social-login';


import { CVTComponent } from './cvt.component';
import { AuthPageModule } from './pages/auth-page/auth-page.module';
import { CVPageModule } from './pages/cv-page/cv-page.module';
import { UserService } from './services/user.service';
import { GuardService } from './services/guard.service';
import { CVTAuthService } from './services/auth.service';
import { environment } from '../environments/environment';
import { MomentModule } from "angular2-moment";

const appRoutes: Routes = [
    { path: '**', redirectTo: '/'},
];

const config = new AuthServiceConfig([
    {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider(environment.clientId)
    },
]);

export function provideConfig() {
    return config;
}

@NgModule({
    declarations: [
        CVTComponent,
    ],
    imports: [
        BrowserModule,
        MaterializeModule,
        ReactiveFormsModule,
        HttpClientModule,
        SocialLoginModule,
        RouterModule.forRoot(appRoutes),
        // blocks
        AuthPageModule,
        CVPageModule,
        MomentModule
    ],
    providers: [
        HttpClient,
        UserService,
        GuardService,
        CVTAuthService,
        {
            provide: AuthServiceConfig,
            useFactory: provideConfig
        }
    ],
    bootstrap: [CVTComponent]
})
export class AppModule {
}
