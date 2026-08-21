import { LoginRequestDTO } from "../../../application/DTO/loginReq";
import { LoginResposneDTO } from "../../../application/DTO/loginRes";

export interface ILoginAdminUseCase {
  execute(request: LoginRequestDTO): Promise<LoginResposneDTO>;
}
