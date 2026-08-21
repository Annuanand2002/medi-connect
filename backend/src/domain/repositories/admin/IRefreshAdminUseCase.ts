import { RefreshTokenReqDTO } from "../../../application/DTO/refreshTokenReqDTo";
import { RefreshTokenResultDTO } from "../../../application/DTO/refreshTokenResultDTO";

export interface IRefreshAdminUseCase {
  execute(request: RefreshTokenReqDTO): Promise<RefreshTokenResultDTO>;
}
