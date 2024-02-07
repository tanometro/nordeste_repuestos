import { ValidationsInterface } from "../../types/interfaces";

export default function validations(inputs: ValidationsInterface) {
  const regexName = /^[a-zA-Z\s]*$/;
  const regexUsername = /^[a-zA-Z]+$/; // No permite espacios y solo string
  const regexDNI = /^\d+$/; // Asume que el DNI debe contener solo dígitos

  let errors = {
    name: "",
    username: "",
    dni: "",
    password: ""
  };

  // Validación del nombre
  if (!regexName.test(inputs.name)) {
    errors.name = "El nombre no puede contener símbolos ni números";
  } else {
    errors.name = "";
  }

  // Validación del username
  if (!regexUsername.test(inputs.username)) {
    errors.username = "El nombre de usuario solo puede contener letras y no puede tener espacios ni números";
  } else {
    errors.username = "";
  }

  // Validación del DNI
  if (!regexDNI.test(inputs.dni) || inputs.dni.length < 7) {
    errors.dni = "El DNI debe contener solo números y al menos 7 dígitos";
  } else {
    errors.dni = "";
  }

  // Validación de la contraseña
  if (inputs.password.length < 3) {
    errors.password = "La contraseña del usuario debe tener al menos 3 caracteres";
  } else {
    errors.password = "";
  }

  return errors;
}



