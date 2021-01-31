import { User } from '../../user/user'

export class PasswordController {
    static passwordValidation(password1: string, password2: string): string {
        let errorMessage: string = ''
        if (password1.length < 8) {
            errorMessage += 'Password must be longer than 8 symbols. '
            return errorMessage.trim()
        } else if (password1.length > 50) {
            errorMessage += 'Password must be shorter than 50 symbols. '
            return errorMessage.trim()
        } else {
            if (password1.search(/(?=.*\d)/)) {
                errorMessage += 'Password must have at least one digit. '
            }
            if (password1.search(/(?=.*[a-z])/)) {
                errorMessage += 'Password must have at least one lower case letter. '
            }
            if (password1.search(/(?=.*[A-Z])/)) {
                errorMessage += 'Password must have at least one upper case letter. '
            }
            if (password1 !== password2) {
                errorMessage += 'Passwords must match. '
            }
        }
        return errorMessage.trim()
    }

    static isPasswordNew(user: User, password: string): boolean {
        if (user.password) {
            return user.password !== password ? true : false
        }
        return false
    }
}
