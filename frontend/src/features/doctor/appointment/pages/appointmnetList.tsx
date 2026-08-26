import DoctorLayout from "@/layout/DoctorLayout";
import { CalendarCheck } from "lucide-react";

import Pagination from "@/features/admin/components/Pagination";

import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import { fetchDoctorAppointment } from "../redux/appointment.thunk";
import DoctorAppointmentHistoryFilters from "../components/appointment.filter";
import { setDate, setPage } from "../redux/appointment.slice";
import DoctorAppointmentHistoryTable from "../components/appointment.table";


const DoctorAppointmentHistoryPage = () => {
  const dispatch = useAppDispatch();

  const { appointments, page, limit, totalPages, date, isLoading, error } =
    useAppSelector((state) => state.doctorAppointment);

  const [searchInput, setSearchInput] = useState("");

  const debouncedSearch = useDebounce(searchInput, 500);

  useEffect(() => {
    dispatch(
      fetchDoctorAppointment({
        page,
        limit,
        search: debouncedSearch || undefined,
        date,
      }),
    );
  }, [dispatch, page, limit, debouncedSearch, date]);

  return (
    <DoctorLayout
      title="Appointment History"
      subtitle="View and manage your patient appointments."
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

            <p>View your patient appointments and their details.</p>
          </div>
        </section>

        {/* FILTERS */}
        <DoctorAppointmentHistoryFilters
          search={searchInput}
          date={date}
          onSearchChange={setSearchInput}
          onDateChange={(value) => dispatch(setDate(value))}
        />

        {/* CONTENT */}
        {isLoading ? (
          <div className="doctor-request-state">
            <div className="doctor-request-loader">
              <span />
              <span />
              <span />
            </div>

            <h3>Loading appointments</h3>

            <p>Fetching patient appointments.</p>
          </div>
        ) : error ? (
          <div className="doctor-request-state doctor-request-error">
            <div className="doctor-request-state-icon">!</div>

            <h3>Unable to load appointments</h3>

            <p>{error}</p>
          </div>
        ) : (
          <>
            {/* TABLE */}
            <DoctorAppointmentHistoryTable appointments={appointments} />

            {/* PAGINATION */}
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(nextPage) => dispatch(setPage(nextPage))}
            />
          </>
        )}
      </div>
    </DoctorLayout>
  );
};

export default DoctorAppointmentHistoryPage;
