import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CVFormComponent } from "./CVForm.component";
import { MomentModule } from "angular2-moment";
import { ReactiveFormsModule } from "@angular/forms";
import { MaterializeModule } from 'angular2-materialize';

@NgModule({
    imports: [
        MaterializeModule,
        CommonModule,
        MomentModule,
        ReactiveFormsModule,
    ],
    declarations: [CVFormComponent],
    exports: [CVFormComponent]
})
export class CVFormModule {}