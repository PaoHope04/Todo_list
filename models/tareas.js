import { leerDB } from '../helpers/guardarArchivo.js';
import Tarea from './tarea.js';
class Tareas {
  //! aqui generamos el listado de tareas
  _listado = {}; //* Instanciamos el listado

  get listadoArr() {
    //? accedemos a los valores de ese listado volviendolo un array
    const listado = [];

    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });

    return listado;
  }
  constructor() {
    this._listado = {};
  }

  borrarTarea(id = '') {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  cargarTareasFormArray(tareas = []) {
    //? regresamos la info que tenemos a un array para poder tenerlo como obj original en la aplicacion
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  crearTarea(desc = '') {
    //* creamos una nueva tarea con base en el modulo de tarea
    const tarea = new Tarea(desc);

    this._listado[tarea.id] = tarea; //? agregamos el listado y el id unico que tendra para que apunte a la nueva tarea
  }

  listadoCompleto() {
    console.log();
    // ! solucion mia
    // for (const key in this._listado) { //? itero sobre el objeto que tiene todas las propiedades del listado
    // let contador= 0
    //   const { desc, completadoEn } = this._listado[key]; //? destructuro las propiedades que ocupare
    //   contador++
    //   console.log(`${contador}. ${desc} :: ${completadoEn}`); //? hago lo que se mostra en la aplicacion

    // }

    //* Solucion del maestro
    this.listadoArr.forEach((e, i) => {
      const idx = `${i + 1}`.america;

      const { desc, completadoEn } = e;

      const estado = completadoEn ? 'Completado'.green : 'Pendiente'.red;

      console.log(`${idx}. ${desc}  :: ${estado} `);
    });
  }

  listarPendientesCompletadas(complete = true) {
    //* Mostrar las tareas completadas y no completadas
    let idx = 0;
    //? iteramos donde tenemos la lista completa 👇
    this.listadoArr.forEach((e) => {
      const { desc, completadoEn } = e; //? destructuramos las keys que vamos a ocupar

      const estado = completadoEn ? 'Completado'.green : 'Pendiente'.red; //! evaluamos si hay algo dentro de completadoEn
      if (complete) {
        //? Evaluamos si esta en true la parte del completadoEn
        if (completadoEn) {
          idx += 1;
          console.log(
            `${(idx + '.').rainbow} ${desc}  :: ${completadoEn.rainbow} `
          );
        }
      } else {
        if (!completadoEn) {
          //? evaluamos si no esta completada
          idx += 1;
          console.log(`${(idx + '.').rainbow} ${desc}  :: ${estado} `);
        }
      }
    });
  }

  toggleCompletadas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    });
    this.listadoArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    });
  }
}
export default Tareas;
