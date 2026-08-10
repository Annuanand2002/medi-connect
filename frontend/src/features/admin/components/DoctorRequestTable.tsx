import {
  ArrowUpRight,
  Mail,
  UserRound,
} from "lucide-react";

import { Link } from "react-router-dom";

import StatusBadge from "./StatusBadge";

import type {
  DoctorRequest,
} from "../types/doctorRequestList.types";

import { formateDate } from "@/utils/formateDate";

interface DoctorRequestTableProps {
  requests: DoctorRequest[];
}

const DoctorRequestTable = ({
  requests,
}: DoctorRequestTableProps) => {

  /* -------------------------------------------------------
     EMPTY STATE
  ------------------------------------------------------- */

  if (requests.length === 0) {
    return (
      <div className="doctor-request-empty">

        <div className="doctor-request-empty-icon">
          <UserRound size={23} />
        </div>

        <span>
          NO APPLICATIONS
        </span>

        <h3>
          No doctor requests found
        </h3>

        <p>
          Try adjusting your search or status
          filter to find what you're looking for.
        </p>

      </div>
    );
  }

  return (
    <div className="doctor-request-table-wrapper">

      <table className="doctor-request-table">

        <thead>
          <tr>

            <th>
              Doctor
            </th>

            <th>
              Specialization
            </th>

            <th>
              Experience
            </th>

            <th>
              Requested
            </th>

            <th>
              Status
            </th>

            <th className="doctor-action-heading">
              Action
            </th>

          </tr>
        </thead>


        <tbody>

          {requests.map((request) => (

            <tr key={request.id}>

              {/* Doctor */}
              <td>
                <div className="doctor-cell">

                  <div className="doctor-avatar">
                    {request.fullName
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <div className="doctor-info">

                    <strong>
                      {request.fullName}
                    </strong>

                    <span>
                      <Mail size={12} />
                      {request.email}
                    </span>

                  </div>

                </div>
              </td>


              {/* Specialization */}
              <td>
                <span className="doctor-specialization">
                  {request.specialization}
                </span>
              </td>


              {/* Experience */}
              <td>
                <span className="doctor-experience">
                  {request.experience}
                  <small>
                    years
                  </small>
                </span>
              </td>


              {/* Date */}
              <td>
                <span className="doctor-date">
                  {formateDate(
                    request.createdAt,
                  )}
                </span>
              </td>


              {/* Status */}
              <td>
                <StatusBadge
                  status={request.status}
                />
              </td>


              {/* Action */}
              <td className="doctor-action-cell">

                <Link
                  to={`/admin/doctor-request/${request.id}`}
                  className="doctor-view-button"
                >
                  <span>
                    View Details
                  </span>

                  <ArrowUpRight
                    size={15}
                  />
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
