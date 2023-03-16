
import  fs  from "fs"; //* importamos el file system

const archivo= './db/data.json' //* declaramos la ruta del archivo

export const guardarDB = (data) => { //! la funcion se encargara de escribir el archivo en formato JSON

  fs.writeFileSync(archivo, JSON.stringify (data)) //? escribimos el archivo pasandolo a formato json
}

export const leerDB = () => {
  if (!fs.existsSync(archivo)) {
    //? aqui checamos que el archivo exista
    return null;
  }

  const info = fs.readFileSync(archivo, { encoding: 'utf-8' }); //? hacemos que se lea el archivo y lo pasamos a formato legible

  const data = JSON.parse(info); //? hacemos lo contario que en stringify pasandolo ser el array de nuevo

  // console.log(data);

  return data;
}
