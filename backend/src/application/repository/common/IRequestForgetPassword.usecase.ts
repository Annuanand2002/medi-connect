

export interface IRequestForgetPassword{
    execute(email:string):Promise<void>
}