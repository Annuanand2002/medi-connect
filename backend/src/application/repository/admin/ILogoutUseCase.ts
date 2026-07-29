import { LogoutReqDTO } from "../../DTO/logoutReq";

export interface ILogoutUseCase {
  execute(request: LogoutReqDTO): Promise<void>;
}
