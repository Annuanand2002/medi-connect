import { Container } from "inversify";
import { registerCommonBindings } from "./common.conatiner";
import { doctorBinding } from "./doctor.container";
import { departmentBinding } from "./dpeartment.conatiner";
import { adminBinding } from "./admin.container";
import { patientBinding } from "./patient.container";


const container = new Container()

registerCommonBindings(container);
doctorBinding(container);
departmentBinding(container)
adminBinding(container)
patientBinding(container)

export default container;