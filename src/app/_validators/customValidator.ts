import { ValidationErrors, ValidatorFn, AbstractControl, FormGroup } from '@angular/forms';



export class CustomValidators{
    static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
          if (!control.value) {
            // if control is empty return no error
            return null as any;
          }
      
          // test the value of the control against the regexp supplied
          const valid = regex.test(control.value);
      
          // if true, return no error (no error), else return error passed in the second parameter
          return valid ? null as any : error;
        };
      }

      
      static passwordMatchValidator(control: AbstractControl) {
        const password: string = control.get('password')?.value; // get password from our password form control
        const confirmPassword: string = control.get('confirmPassword')?.value; // get password from our confirmPassword form control
        // compare is the password math
        if (password !== confirmPassword) {
          // if they don't match, set an error in our confirmPassword form control
          control.get('confirmPassword')?.setErrors({ NoPassswordMatch: true });
        }
      }

      
}

//Ver esto
export const identityRevealedValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const name = control.get('name');
    const alterEgo = control.get('alterEgo');
  
    return name && alterEgo && name.value === alterEgo.value ? { identityRevealed: true } : null;
  };

  export function MustMatch(controlName: string, matchingControlName: string) {
    return (group: AbstractControl) => {
        const formGroup = <FormGroup>group;
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors['NoPassswordMatch']) {
            // return if another validator has already found an error on the matchingControl
            return null;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ NoPassswordMatch: true });
        } else {
            matchingControl.setErrors(null);
        }

        return null;
    }
}