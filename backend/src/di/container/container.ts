import { Container } from "inversify";
import { registerCommonBindings } from "./common.conatiner";
import { doctorBinding } from "./doctor.container";
import { adminBinding } from "./admin.container";
import { patientBinding } from "./patient.container";


const container = new Container()

registerCommonBindings(container);
doctorBinding(container);
adminBinding(container)
patientBinding(container)

export default container;