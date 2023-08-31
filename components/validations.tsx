type Inputs = {
    email: string,
    dni: number,

}
export default function Validations(inputs: Inputs) {
    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    type dni = number;
    let errors: Record<string, string> = {};

    (!inputs.email) ? errors.email = "Escribir un email" : errors.email = "";
    (!regexEmail.test(inputs.email)) ? errors.email = "Email no válido" : errors.email = "";
    (typeof inputs.dni !== "number") ? errors.dni = "Ingresa un DNI con números sin puntos ni espacios" : errors.dni = "";

    return errors;
}