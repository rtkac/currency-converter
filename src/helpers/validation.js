import { numRegex } from '../constants/others';

export const validation = (element) => {

  let value = element.config.value;
  let name = element.config.name;

  let errorMessage = null;
  let error = [true, errorMessage];

  if(element.validation.number) {
    let valid = value.match(numRegex) === null;
    errorMessage = `${name} must be a number`;
    error = valid ? [!valid, errorMessage] : error;
  } else if(element.validation.required) {
    let valid = value.trim() === '';
    errorMessage = `${name} cannot be empty`;
    error = valid ? [!valid, errorMessage] : error;
  }

  return error;
}