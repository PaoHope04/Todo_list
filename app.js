import { guardarDB, leerDB } from './helpers/guardarArchivo.js';
import * as exportacionesIn from './helpers/inquirer.js';
import Tareas from './models/tareas.js';

const main = async () => {
  //* funcion donde se ejecutara nuestro programa
  let opt = ''; //? opciones

  const tareas = new Tareas(); //? creamos la nueva instancia de tareas

  const tareasDB = leerDB(); //? guardamos referencia

  if (tareasDB) {
    tareas.cargarTareasFormArray(tareasDB);
  }

  // await exportacionesIn.pausa();

  do {
    opt = await exportacionesIn.inquireMenu(); //? Exportamos el menu que se vera en consola

    switch (
      opt //? le damos una accion distinta a cada numero del menu
    ) {
      case 1:
        //? Creando la opcion
        const desc = await exportacionesIn.leerInput('Descriptcion:'); //! Ejecutamos la funcion que permite agregar una tarea nueva
        tareas.crearTarea(desc); //! ejecutamos la funcion que crea las tareas
        break;
      case 2:
        // console.log(tareas.listadoArr); //* ejecutamos la funcion que nos ayuda a listar las tareas
        tareas.listadoCompleto();
        break;
      case 3: //? Listar completas
        tareas.listarPendientesCompletadas(true);

        break;
      case 4: //? Listar Pendientes
        tareas.listarPendientesCompletadas(false);

        break;
      case 5: //* completado o pendiente
        const ids = await exportacionesIn.mostrarListadoCheckList(
          tareas.listadoArr
        );
        tareas.toggleCompletadas(ids);
        break;
      case 6: //* Borrar
        const id = await exportacionesIn.listadoTareasBorrar(tareas.listadoArr);
        if (id !== '0') {
          // todo: hacer confirmacion de que se quiere eliminar
          const ok = await exportacionesIn.confirmar('¿Estas seguro?');

          if (ok) {
            tareas.borrarTarea(id);
            console.log('Tarea Borrada');
          }
        }

        break;
    }
    guardarDB(tareas.listadoArr); //! esta funcion guarda el listado de las tareas

    await exportacionesIn.pausa(); //* le damos una pausa
  } while (opt !== 0);
};

main();
