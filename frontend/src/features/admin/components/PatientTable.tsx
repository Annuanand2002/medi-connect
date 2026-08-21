import { useAppDispatch } from "@/hooks/hooks";
import { ArrowUpRight, Code, Mail, UserRound } from "lucide-react";
import { togglePatientStatusThunk } from "../redux/togglePatient.thunk";
import type { TableColumn } from "@/types/dataTable";
import type { Patients } from "../types/patientList";
import { formateDate } from "@/utils/formateDate";
import DataTable from "@/components/dataTable";


interface PatientTableProps {
  requests: Patients[];
}

const PatientTable = ({ requests }: PatientTableProps) => {
  const dispatch = useAppDispatch();
  const handleToggleStastus = async(id:string)=>{
    await dispatch(togglePatientStatusThunk(id))
  }
  const columns: TableColumn<Patients>[] = [
    {
      key: "patient",
      header: "Patient",

      render: (request) => (
        <div className="doctor-cell">
          <div className="doctor-avatar">
            {request.fullName.charAt(0).toUpperCase()}
          </div>

          <div className="doctor-info">
            <strong>{request.fullName}</strong>
            <span>
              <Code size={12} />
              {request.patientCode}
            </span>
            <span>
              <Mail size={12} />
              {request.email}
            </span>
          </div>
        </div>
      ),
    },

    {
      key: "dateOfBirth",
      header: "DOB",

      render: (request) => ( 
        <span className="doctor-specialization">{formateDate(request.dateOfBirth.toString())}</span>
      ),
    },

    {
      key: "vitals",
      header: "Vitals",

      render: (request) => (
        <span className="doctor-experience">
          {request.weight}
          <small>kg</small>
          {request.height}
          <small>cm</small>
        </span>
      ),
    },

    {
      key: "createdAt",
      header: "Joined",

      render: (request) => (
        <span className="doctor-date">{formateDate(request.createdAt.toString())}</span>
      ),
    },
    {
      key: "isBlocked",
      header: "isBlocked",

      render: (request) => (
        <span className="doctor-specialization">{request.isBlocked}</span>
      ),
    },

    {
      key: "action",
      header: "Action",
      className: "doctor-action-heading",

      render: (request) => (
        <div className="doctor-action-cell">
         <button type="button" onClick={()=>handleToggleStastus(request.id)}
         className="doctor-view-button"
          >
            <span>{request.isBlocked==="BLOCKED"?"ACTIVE":"BLOCK"}</span>
            <ArrowUpRight size={15}/>
          </button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      data={requests}
      columns={columns}
      rowKey={(request) => request.id}
      emptyState={
        <div className="doctor-request-empty">
          <div className="doctor-request-empty-icon">
            <UserRound size={23} />
          </div>

          <span>NO APPLICATIONS</span>

          <h3>No doctor requests found</h3>

          <p>
            Try adjusting your search or status filter to find what you're
            looking for.
          </p>
        </div>
      }
    />
  );
};

export default PatientTable;