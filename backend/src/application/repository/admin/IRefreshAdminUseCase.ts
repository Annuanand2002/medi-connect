import { RefreshTokenReqDTO } from "../../DTO/refreshTokenReqDTo";
import { RefreshTokenResultDTO } from "../../DTO/refreshTokenResultDTO";

export interface IRefreshAdminUseCase {
  execute(request: RefreshTokenReqDTO): Promise<RefreshTokenResultDTO>;
}
