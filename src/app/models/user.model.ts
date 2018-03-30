export class UserModel {

    public id;
    public name;
    public title;
    public grade;
    public photo;
    public role;
    public team;

    constructor(cv: any) {
        if (cv.Employee) {
            this.id = cv.Employee.Id || '';
            this.name = cv.Employee.name || '';
            this.title = cv.Employee.title || '';
            this.grade = cv.Employee.grade || '';
            this.photo = cv.Employee.photo || null;
            this.role = cv.Employee.role || 'user';
            this.team = cv.Employee.team || [];
        }
    }
}