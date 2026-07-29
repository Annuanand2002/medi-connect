import { LoginRequestDTO } from "../../DTO/loginReq";
import { LoginResposneDTO } from "../../DTO/loginRes";

export interface ILoginAdminUseCase {
  execute(request: LoginRequestDTO): Promise<LoginResposneDTO>;
}
