import { useEffect, useState } from "react";
import DoctorRequestTable from "../../features/admin/components/DoctorRequestTable";
import Pagination from "../../features/admin/components/Pagination";

import { getDoctorRequestListThunk } from "../../features/admin/redux/doctorRequestList.thunk";
import {
  setPage,
  setSearch,
  setStatus,
} from "../../features/admin/redux/doctorRequestList.slice";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import useDebounce from "@/app/hooks/useDebounce";
import AdminLayout from "../../shared/layouts/AdminLayout";
import DoctorRequestFilters from "../../features/admin/components/DoctorRequest.filter";

const DoctorRequestsPageList = () => {
  const dispatch = useAppDispatch();

  const { loading, requests, page, limit, totalPages, search, status, error } =
    useAppSelector((state) => state.doctorRequestList);
  const [searchInput, setSearchInput] = useState(search);
  const debouncedSearch = useDebounce(searchInput, 500);
  useEffect(() => {
    if (debouncedSearch !== search) {
      dispatch(setSearch(debouncedSearch));
    }
  }, [debouncedSearch, search, dispatch]);

  useEffect(() => {
    dispatch(
      getDoctorRequestListThunk({
        page,
        limit,
        search,
        status,
      }),
    );
  }, [dispatch, page, limit, search, status]);

  return (
    <AdminLayout
      title="Doctor Requests"
      subtitle="Review and manage doctor applications."
    >
      <DoctorRequestFilters
        search={searchInput}
        status={status}
        onSearchChange={setSearchInput}
        onStatusChange={(value) => dispatch(setStatus(value))}
      />

      {loading ? (
        <div className="rounded-xl bg-white p-8 text-center shadow-sm">
          Loading...
        </div>
      ) : error ? (
        <div className="rounded-xl bg-red-50 p-8 text-center text-red-600 shadow-sm">
          {error}
        </div>
      ) : (
        <>
          <DoctorRequestTable requests={requests} />

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(page) => dispatch(setPage(page))}
          />
        </>
      )}
    </AdminLayout>
  );
};

export default DoctorRequestsPageList;
