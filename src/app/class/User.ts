export class User{
    public id : number;
    public username: string;
    public password: string;
    public token: string;

    constructor(username: string, password:string){
        this.id= 0;
        this.username = username;
        this.password = password;
    }
    
    getId():number{
        return this.id;
    }

    getUsername(): string{
        return this.username;
    }

    getPassword(): string{
        return this.password;
    }

    setId($id:number): void{
        this.id = $id;
    }
    getToken(){
        return this.token;
    }
}