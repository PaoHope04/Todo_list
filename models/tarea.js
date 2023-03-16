import { v4 as uuidv4 } from "uuid"; //* exportamos uuid que nos brindara el id dinamico

export default class Tarea { 
  id = '';
  desc = '';
  completadoEn = null;

  constructor(desc) {
    this.id= uuidv4() //! aqui se lleva acabo el id dinamico
    this.desc = desc //! esta es la descripcion de la tarea que se ejecuta en el archivo de Tareas
    this.completadoEn= null
  }
}









