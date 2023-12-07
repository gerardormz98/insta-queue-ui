import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const passwordWeakValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const regex: RegExp = /^(.[^0-9]*|[^a-zA-Z]*)$/; // Not numbers OR not letters
  const isValid = !regex.test(control.value);

  return isValid ? null : { passwordWeak: true };
}
