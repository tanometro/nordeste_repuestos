
export default function validations(userData: { dni: string, username: string, password: string}) {
    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let errors: { dni: string, username: string, password: string, } = {
        dni: "",
        username: "",
        password: "",
      };

      if (!userData.dni) {
        errors.dni = "Ingresa un DNI válido";
      }
    
      if (!userData.username) {
        errors.username = "Ingresa un nombre de usuario válido";
      }
    
      if (!userData.password) {
        errors.password = "Ingresa una contraseña válida";
      }


    return errors;
}
