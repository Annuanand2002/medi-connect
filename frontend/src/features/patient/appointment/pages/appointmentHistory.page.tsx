
import PatientLayout from "@/layout/PatientLayout";
import { CalendarCheck } from "lucide-react";

import Pagination from "@/features/admin/components/Pagination";

import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";

import {
  setPage,
  setStatus,
} from "../redux/appointmentHistory.slice";

import { fetchAppointmentHistory } from "../redux/appointmentHistory.thunk";
import AppointmentHistoryFilters from "../components/appointmentHistory.filter";
import AppointmentHistoryTable from "../components/appointmentHistoryTable";
import type { AppointmentStatus } from "../type/appointmentList";


const AppointmentHistoryPage = () => {
  const dispatch = useAppDispatch();

  const {
    appointments,
    page,
    limit,
    totalPages,
    status,
    isLoading,
    error,
  } = useAppSelector(
    (state) => state.appointmentHistory,
  );

  const [searchInput, setSearchInput] =
    useState("");

  const debouncedSearch = useDebounce(
    searchInput,
    500,
  );

  useEffect(() => {
    dispatch(
      fetchAppointmentHistory({
        page,
        limit,
        search:
          debouncedSearch || undefined,
        status,
      }),
    );
  }, [
    dispatch,
    page,
    limit,
    debouncedSearch,
    status,
  ]);

  return (
    <PatientLayout
      title="Appointment History"
      subtitle="View and manage your appointments."
    >
      <div className="doctor-list-page">

        {/* HEADER */}
        <section className="doctor-list-intro">
          <div className="doctor-list-intro-icon">
            <CalendarCheck size={22} />
          </div>

          <div>
            <span>APPOINTMENTS</span>

            <h2>Appointment History</h2>

            <p>
              View your appointments and
              their current status.
            </p>
          </div>
        </section>

        {/* FILTERS */}
        <AppointmentHistoryFilters
          search={searchInput}
          status={status}
          onSearchChange={setSearchInput}
          onStatusChange={(
            value?: AppointmentStatus,
          ) =>
            dispatch(setStatus(value))
          }
        />

        {/* CONTENT */}
        {isLoading ? (
          <div className="doctor-request-state">
            <div className="doctor-request-loader">
              <span />
              <span />
              <span />
            </div>

            <h3>
              Loading appointments
            </h3>

            <p>
              Fetching your appointment
              history.
            </p>
          </div>
        ) : error ? (
          <div className="doctor-request-state doctor-request-error">
            <div className="doctor-request-state-icon">
              !
            </div>

            <h3>
              Unable to load appointments
            </h3>

            <p>{error}</p>
          </div>
        ) : (
          <>
            {/* TABLE */}
            <AppointmentHistoryTable
              appointments={appointments}
            />

            {/* PAGINATION */}
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(nextPage) =>
                dispatch(setPage(nextPage))
              }
            />
          </>
        )}
      </div>
    </PatientLayout>
  );
};

export default AppointmentHistoryPage;
