import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EDUCATION, PROJECT } from '../../constants/app-info.constant';
import { CvModel } from '../../models/cv.model';
import { CvService } from '../../services/cv.service';
import { CVTAuthService } from "../../services/auth.service";

declare var Materialize: any;


@Component({
    selector: 'app-cvform',
    templateUrl: './CVForm.component.html',
    styleUrls: ['./CVForm.component.scss']
})
export class CVFormComponent implements OnInit {

    public EDUCATION = EDUCATION;
    public PROJECT = PROJECT;

    public preliminaryForm: CvModel;
    public formChanged = false;
    public error: any = {
        edu: [],
        project: []
    };


    public CVForm: FormGroup;
    public educationList: any;
    public projectExperienceList: any;
    public showContent: boolean = false;
    public myForm: boolean = true;

    private id: string = null;

    constructor(private _formBuilder: FormBuilder,
                private _cvService: CvService,
                public authService: CVTAuthService) {

        this._cvService.activeCv
            .subscribe((id) => {
                this.id = id;
                this.changeCV();
            });

    }

    public ngOnInit(): void {
        this.changeCV();
    };

    public changeCV(): void {
        this.showContent = false;
        this._cvService.getCV(this.id)
            .subscribe(
                (cv: CvModel) => {
                            this.preliminaryForm = cv;
                            this.createForm();
                            this.showContent = true;
                            this.myForm = true;
                            if (this.id) {
                                this.myForm = false;
                            } else {
                                this.id = this.authService.token;
                            }
                        },
                (err) => { this.CVForm.disable();}
            );
    }


    public add(field: string, data?: any): void {
        this[field] = this.CVForm.get(field) as FormArray;
        if (data) {
            this[field].push(this._create(field, data));
        } else {
            this[field].push(this._create(field, {}));
            this.setFormChanged(true);
        }
    }

    public remove(field: string, index: number): void {
        this.setFormChanged(true);
        if (field === 'educationList') {
            this.error.edu[index] = false;
        } else {
            this.error.project[index] = false;
        }
        this[field] = this.CVForm.get(field) as FormArray;
        this[field].removeAt(index);
    }

    public submit(): void {
        this._cvService.postCv(this.CVForm.value, this.id)
            .subscribe(
                (res) => {
                    if (res) {
                        Materialize.toast('Success', 4000);
                        this.setFormChanged(false);
                        this.changeCV();
                    }
                }
            );
    }

    public thisYearValidator(control: FormControl): { [s: string]: boolean } {
        if (control.value > new Date().getFullYear()) {
            return { 'year': true };
        } else {
            return null;
        }
    }

    public thisFullDateValidation(control: FormControl): { [s: string]: boolean } {
        if ((control.value) && (control.value.length === 7)) {

            const year = parseInt(control.value.slice(3));
            const month = parseInt(control.value.slice(0, 2));

            if ((month > 0) && (month < 13)) {
                if (year < new Date().getFullYear()) {
                    return null;
                } else if (( year === new Date().getFullYear()) && ((month - 1) <= new Date().getMonth())) {
                    return null;
                } else {
                    return { 'year': true };
                }
            } else {
                return { 'invalidMonth': true };
            }

        } else {
            return null;
        }
    }

    public checkErrorEdu(i?: number): boolean {

        if (i !== undefined) {
            const start = parseInt(this.CVForm.controls[EDUCATION]['controls'][i]['controls']['start'].value);
            const end = parseInt(this.CVForm.controls[EDUCATION]['controls'][i]['controls']['end'].value);

            if (start > end) {
                this.error.edu[i] = true;
            } else {
                this.error.edu[i] = false;
            }
        }

        return this.error.edu.every((item) => item === false);
    }

    public checkProjectEdu(i?: number): boolean {
        if ((i !== undefined) && (this.CVForm.controls[PROJECT]['controls'][i]['controls']['start'].valid) && (this.CVForm.controls[PROJECT]['controls'][i]['controls']['end'].valid)) {
            const start = parseInt(this.CVForm.controls[PROJECT]['controls'][i]['controls']['start'].value.slice(3)) || 0;
            const end = parseInt(this.CVForm.controls[PROJECT]['controls'][i]['controls']['end'].value.slice(3)) || 0;

            if (start > end) {
                this.error.project[i] = true;
            } else if (start == end) {
                const startMonth = parseInt(this.CVForm.controls[PROJECT]['controls'][i]['controls']['start'].value.slice(0, 2));
                const endMonth = parseInt(this.CVForm.controls[PROJECT]['controls'][i]['controls']['end'].value.slice(0, 2));

                if (startMonth > endMonth) {
                    this.error.project[i] = true;
                } else {
                    this.error.project[i] = false;
                }
            } else {
                this.error.project[i] = false;
            }
        }

        return this.error.project.every((item) => item === false);
    }

    public reactivateEndDate(i: number): void {
        if (this.CVForm.controls[PROJECT]['controls'][i]['controls']['end'].enabled) {
            this.CVForm.controls[PROJECT]['controls'][i]['controls']['end'].setValue('');
            this.CVForm.controls[PROJECT]['controls'][i]['controls']['end'].disable();
        } else {
            this.CVForm.controls[PROJECT]['controls'][i]['controls']['end'].enable();
        }
        this.setFormChanged(true);
    }

    public setFormChanged(value: boolean): void {
        this.formChanged = value;
    }

    private createForm(): void {

        this.CVForm = this._formBuilder.group({
            summary: new FormControl(this.preliminaryForm.mutable.summary, [Validators.required, Validators.maxLength(2000)]),
            techSkills: new FormControl(this.preliminaryForm.mutable.techSkills, [Validators.required, Validators.maxLength(2000)]),
            certificates: new FormControl(this.preliminaryForm.mutable.certificates, [Validators.required, Validators.maxLength(2000)]),
            educationList: this._formBuilder.array([]),
            projectExperienceList: this._formBuilder.array([], )
        });

        this.preliminaryForm.mutable[this.PROJECT].forEach((project, index) => {
            this.add(this.PROJECT, project);
        });

        this.preliminaryForm.mutable[this.EDUCATION].forEach((education) => {
            this.add(this.EDUCATION, education);
        });
    }

    private _create(field: string, data: any): FormGroup {
        switch (field) {
            case EDUCATION:
                return this._formBuilder.group({
                    start: new FormControl(data.start || '', [Validators.required, Validators.pattern('^[0-9]{4}$'), this.thisYearValidator]),
                    end: new FormControl(data.end || '', [Validators.required, Validators.pattern('^[0-9]{4}$') ]),
                    university: new FormControl(data.university || '', [Validators.required, Validators.maxLength(200)]),
                    faculty: new FormControl(data.faculty || '', [Validators.required, Validators.maxLength(200)]),
                });
            case PROJECT:
                return this._formBuilder.group({
                    name: new FormControl(data.name || '', [Validators.required, Validators.maxLength(200)]),
                    responsibilities: new FormControl(data.responsibilities || '', [Validators.required, Validators.maxLength(2000)]),
                    organization: new FormControl(data.organization || '', [Validators.required, Validators.maxLength(200)]),
                    position: new FormControl(data.position || '', [Validators.required, Validators.maxLength(200)]),
                    start: new FormControl(data.start || '', [Validators.required, Validators.pattern('^[0-9]{2}/{1}[0-9]{4}$'), this.thisFullDateValidation]),
                    end: new FormControl({ value: data.end, disabled: data.tillNow } || {
                        value: '',
                        disabled: false
                    }, [Validators.required, Validators.pattern('^[0-9]{2}/{1}[0-9]{4}$'), this.thisFullDateValidation]),
                    tillNow: data.tillNow || false,
                    description: new FormControl(data.description || '', [Validators.required, Validators.maxLength(500)]),
                    achievements: new FormControl(data.achievements || '', [Validators.required, Validators.maxLength(2000)]),
                    techSkills: new FormControl(data.techSkills || '', [Validators.required, Validators.maxLength(500)]),
                    team: new FormControl(data.team || '', [Validators.required, Validators.maxLength(500)]),
                });
            default:
                throw new SyntaxError('Error of programm');
        }
    }

}
