import PatientLayout from "@/layout/PatientLayout";
import { Stethoscope } from "lucide-react";

import Pagination from "@/features/admin/components/Pagination";

import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";

import { setPage } from "../redux/doctorList.slice";

import { useNavigate } from "react-router-dom";
import DoctorListFilters from "../components/DoctorListFilter";
import { fetchListDoctors } from "../redux/doctorList.thunk";
import DoctorListTable from "../components/doctorListTable";

const DoctorPageList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { doctors, page, limit, totalPages, isLoading, error } = useAppSelector(
    (state) => state.patientDoctors,
  );

  const [searchInput, setSearchInput] = useState("");
  const [department, setDepartment] = useState<string | undefined>();

  const debouncedSearch = useDebounce(searchInput, 500);

  useEffect(() => {
    console.log("fetch akkan pon")
    dispatch(
      fetchListDoctors({
        page,
        limit,
        search: debouncedSearch || undefined,
        department,
      }),
    );
  }, [dispatch, page, limit, debouncedSearch, department]);

  const handleBookAppointment = (doctorId: string) => {
    navigate(`/patient/appointments/${doctorId}`);
  };

  return (
    <PatientLayout
      title="Find a Doctor"
      subtitle="Choose a doctor and book your appointment."
    >
      <div className="doctor-list-page">
        <section className="doctor-list-intro">
          <div className="doctor-list-intro-icon">
            <Stethoscope size={22} />
          </div>

          <div>
            <span>MEDICAL SPECIALISTS</span>

            <h2>Find a Doctor</h2>

            <p>Browse our available doctors and book an appointment.</p>
          </div>
        </section>

        <DoctorListFilters
          search={searchInput}
          department={department}
          onSearchChange={setSearchInput}
          onDepartmentChange={setDepartment}
        />

        {isLoading ? (
          <div className="doctor-request-state">
            <div className="doctor-request-loader">
              <span />
              <span />
              <span />
            </div>

            <h3>Loading doctors</h3>

            <p>Finding available doctors for you.</p>
          </div>
        ) : error ? (
          <div className="doctor-request-state doctor-request-error">
            <div className="doctor-request-state-icon">!</div>

            <h3>Unable to load doctors</h3>

            <p>{error}</p>
          </div>
        ) : (
          <>
            <DoctorListTable requests={doctors} onBook={handleBookAppointment} />

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(nextPage) => dispatch(setPage(nextPage))}
            />
          </>
        )}
      </div>
    </PatientLayout>
  );
};

export default DoctorPageList;
