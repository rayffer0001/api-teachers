import { TeacherRoutes } from './app/routes/TeacherRoutes';
 //Crea la aplicacion para que corra, en el servidor
 //express es el framework que me permite trabajar con el http
 import  express from 'express';
 import config from "./config";

 export class Server {

    private _app: express.Application;

    constructor(){

        this._app = express();
        this.config();
        this.middleware();
        this.routes();

    }

    private config(): void{
        this._app.set('port', process.env.port);
    }

    private middleware(): void{ //van antes de las rutas
        this._app.use(express.json());
        this._app.use(express.urlencoded({extended: false}));
    }

    private routes(): void{
        const teacherRoutes = new TeacherRoutes();
        this._app.use('/api/teachers', teacherRoutes.getRoutes());
    }

    public start(): void{
        this._app.listen(config.port, () => {
            console.log(`server corriendo por el puerto ${config.port}`);
        });
    }
 }