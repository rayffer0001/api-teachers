//obtiene el request y el response para devolverlo 

import { Teacher } from './../../domain/entities/Teacher';
import { ITeacherRepository } from './../../domain/interfaces/ITeacherRepository';
import { Request, Response } from "express";
 
/**
 * @openapi
 * /create:
 *   post:
 *     summary: Crea un nuevo profesor.
 *     requestBody:
 *       description: Datos del profesor a crear.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               email:
 *                 type: string
 *               birthDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       '201':
 *         description: Creado correctamente. Devuelve el profesor creado.
 *       '500':
 *         description: Error interno del servidor. Devuelve un mensaje de error.
 */

 export class TeacherController {

    constructor(private _teacherRepository: ITeacherRepository){

    }

    public async create( request: Request, response: Response ): Promise<Response>{
        
        try{

        const {name, description, email, birthDate} = request.body;
        const teacher: Teacher = new Teacher(name, description, email, new Date(birthDate));
        const createdTeacher =  await this._teacherRepository.create(teacher);
        return response.status(201).json( createdTeacher );

        }catch(error){

            console.log(error);
            return response.status(500).json( 
                {
                    errorMessage: 'Houston tenemos un problema!',
                    code: 9999
                }
             );
        }
        
        
        

    }

 }
