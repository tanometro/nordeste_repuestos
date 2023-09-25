
export default function validations(userData: {username: string, password: string,}) {
  const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{5,}$/;
    let errors: {username: string, password: string, } = {
        username: "",
        password: "",
      };
    
      if (!userData.username) {
        errors.username = "Ingresa un nombre de usuario válido";
      }
    
      if (!regexPassword.test(userData.password)){
        errors.password = "Ingresa una contraseña válida: al menos 1 minúscula, 1 mayúscula, 1 caracter especial y al menos 5 dígitos"
      }
    return errors;
}
