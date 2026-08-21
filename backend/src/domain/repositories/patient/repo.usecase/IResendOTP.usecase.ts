export interface IResentOTPUseCase {
 execute(patientId:string):Promise<void>
}