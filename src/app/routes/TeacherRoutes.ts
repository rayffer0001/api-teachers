import { TeacherController } from './../controllers/TeacherController';
import { TeacherRepository } from './../../infra/repositories/TeacherRepository';
import { Router } from "express";

export class TeacherRoutes {

    private _router: Router;
    private _teacherRepository: TeacherRepository;
    private _teacherController: TeacherController;

    constructor(){
        this._router = Router();
        this._teacherRepository = new TeacherRepository();
        this._teacherController = new TeacherController(this._teacherRepository);
        this.initRoute();
    }

    private initRoute(): void{  //inicializa las rutas
        this._router.post('/create', this._teacherController.create.bind(this._teacherRepository)); //es hasta donde puedo acceder en una variable
    }

    public getRoutes(): Router {
        return this._router;
    }

}
