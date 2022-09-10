export class LoginCredentialModel {
    private userId: string;
    private password: string;

    constructor() {
        this.userId = '';
        this.password = '';
    }

    public getUserId(): string {
        return this.userId;
    }

    public setUserId(userId: string): void {
        this.userId = userId;
    }

    public getPassword(): string {
        return this.password;
    }

    public setPassword(password: string): void {
        this.password = password;
    }

}
