import { useEffect, useState } from "react";
import "@/styles/admin/adminDoctorRequestList.css";
import DoctorRequestTable from "../../../features/admin/components/DoctorRequestTable";
import Pagination from "../../../features/admin/components/Pagination";
import DoctorRequestFilters from "../../../features/admin/components/DoctorRequest.filter";

import {
  getDoctorRequestListThunk,
} from "../../../features/admin/redux/doctorRequestList.thunk";

import {
  setPage,
  setSearch,
  setStatus,
} from "../../../features/admin/redux/doctorRequestList.slice";

import {
  useAppDispatch,
  useAppSelector,
} from "@/hooks/hooks";

import useDebounce from "@/hooks/useDebounce";

import AdminLayout from "../../../layout/AdminLayout";

import {
  ClipboardList,
} from "lucide-react";


const DoctorRequestsPageList = () => {
  const dispatch = useAppDispatch();

  const {
    loading,
    requests,
    page,
    limit,
    totalPages,
    search,
    status,
    error,
  } = useAppSelector(
    (state) => state.doctorRequestList,
  );

  const [searchInput, setSearchInput] =
    useState(search);

  const debouncedSearch = useDebounce(
    searchInput,
    500,
  );
  useEffect(() => {
    if (debouncedSearch !== search) {
      dispatch(setSearch(debouncedSearch));
    }
  }, [
    debouncedSearch,
    search,
    dispatch,
  ]);

  useEffect(() => {
    dispatch(
      getDoctorRequestListThunk({
        page,
        limit,
        search,
        status,
      }),
    );
  }, [
    dispatch,
    page,
    limit,
    search,
    status,
  ]);

  return (
    <AdminLayout
      title="Doctor Requests"
      subtitle="Review and manage doctor applications."
    >
      <div className="doctor-request-page">
        <section className="doctor-request-intro">

          <div className="doctor-request-intro-icon">
            <ClipboardList size={22} />
          </div>

          <div>
            <span>
              APPLICATION MANAGEMENT
            </span>

            <h2>
              Doctor Applications
            </h2>

            <p>
              Review incoming applications and
              manage their approval status.
            </p>
          </div>

        </section>

        <DoctorRequestFilters
          search={searchInput}
          status={status}
          onSearchChange={setSearchInput}
          onStatusChange={(value) =>
            dispatch(setStatus(value))
          }
        />

        {loading ? (

          <div className="doctor-request-state">
            <div className="doctor-request-loader">
              <span />
              <span />
              <span />
            </div>

            <h3>
              Loading applications
            </h3>

            <p>
              Fetching the latest doctor requests.
            </p>
          </div>

        ) : error ? (

          <div className="doctor-request-state doctor-request-error">

            <div className="doctor-request-state-icon">
              !
            </div>

            <h3>
              Unable to load requests
            </h3>

            <p>
              {error}
            </p>

          </div>

        ) : (

          <>
            <DoctorRequestTable
              requests={requests}
            />

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
    </AdminLayout>
  );
};

export default DoctorRequestsPageList;
