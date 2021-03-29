import { AbstractControl } from "@angular/forms";

export class myCustomPasswordValidator {
    static validateConfirmPassword (control: AbstractControl) {
        // if validation is passed, return null
        const password = control.get('password')
        const confirmPassword = control.get('confirmPassword')
        
        return password && confirmPassword && password.value != confirmPassword.value ?
        { 'mismatch': true } : null
    }
}
