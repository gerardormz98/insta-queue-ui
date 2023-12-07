import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const passwordUnmatchValidator: ValidatorFn = (form: AbstractControl): ValidationErrors | null => {
  const password = form.get('password');
  const confirmPassword = form.get('confirmPassword');

  if (password && confirmPassword && password.value != confirmPassword.value)
    return { passwordUnmatch: true };

  return null;
}
