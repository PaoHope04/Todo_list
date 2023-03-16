import inquirer from 'inquirer'; //? Requerimos el paquete de inquirer
import 'colors'; //? requerimos el paquete de colores

const preguntas = [
  //* Instanciamos las opciones para el menu
  {
    type: 'list',
    name: 'opcion',
    message: '¿Que desea hacer?',
    choices: [
      {
        value: 1,
        name: `${'1.'.america}Crear Tarea`,
      },
      {
        value: 2,
        name: `${'2.'.america}Listar Tareas`,
      },
      {
        value: 3,
        name: `${'3.'.america}Listar Tareas Comple`,
      },
      {
        value: 4,
        name: `${'4.'.america}Listar Tareas pendientes`,
      },
      {
        value: 5,
        name: `${'5.'.america}Completar tarea(s)`,
      },
      {
        value: 6,
        name: `${'6.'.america}Borrar Tarea`,
      },
      {
        value: 0,
        name: `${'0.'.america}Salir`,
      },
    ],
  },
];

export const inquireMenu = async () => {
  //! Creacion del menu interactivo
  // console.clear();
  console.log('======================='.rainbow);
  console.log(' Selecione Una Opcion  '.white);
  console.log('=======================\n'.rainbow);

  const { opcion } = await inquirer.prompt(preguntas); //? creamos el menu con base en las opciones creadas

  return opcion;
};

export const pausa = async () => {
  //! creamos la funcion que nos permite ponerle pausa a el menu
  const question = [
    //? instanciamos la opcion
    {
      type: 'input',
      name: 'Presiona Enter',
      message: `Presione ${'ENTER'.green} para continuar\n`,
    },
  ];

  await inquirer.prompt(question); //* Esperamos el resultado de la funcion prompt que nos dara la pausa
};

export const leerInput = async (message = '') => {
  //! Esta funcion nos permitira que el usuario nos ingrese su tarea a completar
  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate(value) {
        //! Validamos que no se agrege algo vacio
        if (value.length === 0) {
          return 'Por favor ingrese un valor';
        }
        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(question); //* esperamos el resultado de la funcion prompt
  return desc;
};

export const listadoTareasBorrar = async (tareas = []) => {
  //   {
  //         value: tarea.id,
  //         name: `${'1.'.green}Crear Tarea`,
  //       }

  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}. `.rainbow;
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc} `,
    };
  });

  choices.unshift({
    value: '0',
    name: '0.'.rainbow + 'cancelar',
  });

  const preguntas = [
    {
      type: 'list',
      name: 'id',
      message: 'borrar',
      choices,
    },
  ];
  const { id } = await inquirer.prompt(preguntas);
  return id;
};

export const confirmar = async (message) => {
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message,
    },
  ];
  const { ok } = await inquirer.prompt(question);
  return ok;
};

export const mostrarListadoCheckList = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}. `.rainbow;
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc} `,
      checked: tarea.completadoEn ? true : false,
    };
  });

  const pregunta = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Selecciones',
      choices,
    },
  ];
  const { ids } = await inquirer.prompt(pregunta);
  return ids;
};
