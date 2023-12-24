import {ValidationsTransaction } from '../interfaces';

const validateTransaction = (inputs: ValidationsTransaction) => {
  let errors = {
    finalCustomerName: '',
    finalCustomerDni: '',
    concept: '',
  };

  // Validación del nombre (debe existir)
  if (!inputs.finalCustomerName || !inputs.finalCustomerName.trim()) {
    errors.finalCustomerName = 'El nombre es obligatorio';
  }

  // Validación del DNI (debe contener solo números y al menos 7 dígitos)
  const regexDNI = /^[0-9]+$/;
  if (!inputs.finalCustomerDni || !regexDNI.test(inputs.finalCustomerDni) || inputs.finalCustomerDni.length < 7) {
    errors.finalCustomerDni = 'El DNI debe contener solo números y al menos 7 dígitos';
  }

  // Validación del concepto (debe existir)
  if (!inputs.concept || !inputs.concept.trim()) {
    errors.concept = 'El concepto es obligatorio';
  }
  if (inputs.concept && inputs.concept.length > 200) {
    errors.concept = 'El concepto no debe superar los 200 caracteres';
  }

  return errors;
};

export default validateTransaction;