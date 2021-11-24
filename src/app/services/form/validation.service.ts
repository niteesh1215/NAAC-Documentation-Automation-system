import { Injectable } from '@angular/core';
import { Validator } from '@angular/forms';

const getKeyValue = <T extends object, U extends keyof T>(obj: T) => (key: U) =>
  obj[key];

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }




  // static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
  //   let config = {
  //     required: 'Required',
  //     invalidEmailAddress: 'Invalid email address',
  //     invalidPassword:
  //       'Invalid password. Password must be at least 6 characters long, and contain a number.',
  //     minlength: `Minimum length ${validatorValue.requiredLength}`
  //   };

  //   switch (validatorName) {
  //     case 'required': return 'Required';
  //     case 'invalidEmailAddress': return 'Invalid email address',
  //     case 'invalidPassword'
  //   }

  //   return config[validatorName as keyof String];
  // }

  static emailValidator(email: string) {
    // RFC 2822 compliant regex
    if (
      email.match(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
      )
    ) {
      return null;
    } else {
      return { invalidEmailAddress: true };
    }
  }

  static passwordValidator(password: string) {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if (password.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
      return null;
    } else {
      return { invalidPassword: true };
    }
  }

}
