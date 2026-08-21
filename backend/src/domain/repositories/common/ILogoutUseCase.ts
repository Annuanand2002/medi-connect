import { LogoutReqDTO } from "../../../application/DTO/logoutReq";


export interface ILogoutUseCase {
  execute(request: LogoutReqDTO): Promise<void>;
}
