import { Link } from "react-router-dom";

import StatusBadge from "./StatusBadge";
import type { DoctorRequest } from "../../../entites/doctor/doctorRequestList.types";
import { formateDate } from "@/shared/utils/formateDate";

interface DoctorRequestTableProps {
  requests: DoctorRequest[];
}

const DoctorRequestTable = ({ requests }: DoctorRequestTableProps) => {
  if (requests.length === 0) {
    return (
      <div className="rounded-xl bg-white p-8 text-center shadow-sm">
        <p className="text-slate-500">No doctor requests found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
      <table className="min-w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
              Doctor
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
              Specialization
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
              Experience
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
              Requested On
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
              Status
            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {requests.map((request) => (
            <tr key={request.id} className="border-t border-slate-200">
              <td className="px-6 py-4">
                <div>
                  <p className="font-medium text-slate-900">
                    {request.fullName}
                  </p>

                  <p className="text-sm text-slate-500">{request.email}</p>
                </div>
              </td>

              <td className="px-6 py-4">{request.specialization}</td>

              <td className="px-6 py-4">{request.experience} Years</td>

              <td className="px-6 py-4">{formateDate(request.createdAt)}</td>

              <td className="px-6 py-4">
                <StatusBadge status={request.status} />
              </td>

              <td className="px-6 py-4 text-center">
                <Link
                  to={`/admin/doctor-request/${request.id}`}
                  className="font-medium text-blue-600 hover:underline"
                >
                  View Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorRequestTable;
