import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly storageKey = 'turnix-auth';
    private readonly validEmail = '1@1';
    private readonly validPassword = '123123';

    login(email: string, password: string): boolean {
        const isValid = email?.trim().toLowerCase() === this.validEmail && password === this.validPassword;

        if (isValid) {
            localStorage.setItem(this.storageKey, 'true');
        } else {
            localStorage.removeItem(this.storageKey);
        }

        return isValid;
    }

    isAuthenticated(): boolean {
        return localStorage.getItem(this.storageKey) === 'true';
    }

    logout(): void {
        localStorage.removeItem(this.storageKey);
    }
}
