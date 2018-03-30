export class CvModel {

    public unchangeable: any = {
        name: null,
        title: null,
        grade: null,
        photo: null,
        role: null,
        dateLastModify: null
    };

    public mutable: any = {
        summary: null,
        techSkills: null,
        certificates: null,
        educationList: null,
        projectExperienceList: null
    };


    constructor(cv) {

        if (cv) {
            this.unchangeable.name = cv.employeeName || '';
            this.unchangeable.title = cv.employeeTitle || '';
            this.unchangeable.grade = cv.employeeGrade || '';
            this.unchangeable.photo = cv.employeePhoto || '';
            this.unchangeable.dateOfLastModify = cv.dateOfLastModify || null;
            if (this.unchangeable.dateOfLastModify) {
                this.unchangeable.dateOfLastModify = new Date(parseInt(this.unchangeable.dateOfLastModify))
            }
        }

        this.mutable.summary = cv.summary || '';
        this.mutable.techSkills = cv.techSkills || '';
        this.mutable.certificates = cv.certificates || '';

        this.mutable.educationList = cv.educationList || [];

        this.mutable.projectExperienceList = cv.projectExperienceList || [];

        if (this.mutable.techSkills) {
            this.mutable.techSkills = this.mutable.techSkills.join(';\n') || null;
        }

        this.mutable.projectExperienceList.forEach((exp) => {
            if (typeof exp.techSkills !== 'string') {
                return exp.techSkills.join(';\n')
            }
        });


    }
}
