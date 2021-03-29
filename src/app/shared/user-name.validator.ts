// this folder/file is created manually
import { AbstractControl, ValidatorFn } from "@angular/forms";

export class myCustomValidator {

    static forbidNameValidator(control: AbstractControl): {[key:string]:any} | null {
        // if validation is passed, return null
        const forbidden = /admin/.test(control.value)
        return forbidden ? { 'forbiddenName': { value: control.value } } : null
    }

    static otherValidator(forbiddenName: RegExp): ValidatorFn {
        return (control: AbstractControl): {[key:string]:any} | null => {
            // if validation is passed, return null
            const forbidden = forbiddenName.test(control.value)
            return forbidden ? { 'otherForbiddenName': { otherValue: control.value } } : null
        }
    }

}

