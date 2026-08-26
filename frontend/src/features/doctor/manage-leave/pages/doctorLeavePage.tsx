import { useEffect, useState } from "react";
import "@/styles/admin/adminDoctorRequestList.css";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import useDebounce from "@/hooks/useDebounce";
import { ClipboardList } from "lucide-react";

import DoctorLayout from "@/layout/DoctorLayout";
import Pagination from "../../components/pagination";

import DoctorLeaveTable from "../compnents/doctorLeaveatable";
import DoctorLeaveFilters from "../compnents/doctorLeaveFilter";

import { fetchDoctorLeave } from "../redux/getDoctorLeave.thubk";
import { createDoctorLeaveThunk } from "../redux/addLeave.thunk";
import { updateDoctorLeaveThunk } from "../redux/updateLeave.thunk";
import { deleteDoctorLeaveThunk } from "../redux/deleteThunk";

import type { CreateDoctorLeave, DoctorLeave } from "../types/doctorLeave.type";

import CreateDoctorLeaveModal from "../compnents/createDoctorLeave.modal";
import UpdateDoctorLeaveModal from "../compnents/udateDoctorLeave.modal";

const DoctorLeavePageList = () => {
  const dispatch = useAppDispatch();

  const {
    leaves,
    isLoading,
    isCreating,
    isUpdating,
    isDeleting,
    page,
    limit,
    totalPages,
    error,
  } = useAppSelector((state) => state.doctorLeave);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const [selectedLeave, setSelectedLeave] = useState<DoctorLeave | null>(null);

  const [searchInput, setSearchInput] = useState("");

  const [date, setDate] = useState<string | undefined>(undefined);

  const debouncedSearch = useDebounce(searchInput, 500);

  // =========================
  // FETCH LEAVES
  // =========================

  useEffect(() => {
    dispatch(
      fetchDoctorLeave({
        page,
        limit,
        search: debouncedSearch,
        date,
      }),
    );
  }, [dispatch, page, limit, debouncedSearch, date]);

  // =========================
  // CREATE LEAVE
  // =========================

  const handleCreateLeave = async (
    data: Omit<DoctorLeave, "id" | "doctorId" | "isDeleted">,
  ): Promise<string | null> => {
    const result = await dispatch(createDoctorLeaveThunk(data));

    if (createDoctorLeaveThunk.fulfilled.match(result)) {
      setIsModalOpen(false);

      return null;
    }

    return result.payload ?? "Failed to create doctor leave";
  };


  const handleEditLeave = (leave: DoctorLeave) => {
    setSelectedLeave(leave);
    setIsUpdateModalOpen(true);
  };


  const handleUpdateLeave = async (
    id: string,
    data: CreateDoctorLeave,
  ): Promise<string | null> => {
    const result = await dispatch(
      updateDoctorLeaveThunk({
        id,
        data,
      }),
    );

    if (updateDoctorLeaveThunk.fulfilled.match(result)) {
      setIsUpdateModalOpen(false);
      setSelectedLeave(null);

      return null;
    }

    return result.payload ?? "Failed to update doctor leave";
  };


  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedLeave(null);
  };


  const handleDeleteLeave = async (leave: DoctorLeave): Promise<void> => {
    await dispatch(deleteDoctorLeaveThunk(leave.id));
  };

  return (
    <DoctorLayout
      title="Doctor Leaves"
      subtitle="View and manage doctor leave requests."
    >
      <div className="doctor-request-page">
        {/* INTRO */}

        <section className="doctor-request-intro">
          <div className="doctor-request-intro-icon">
            <ClipboardList size={22} />
          </div>

          <div>
            <span>LEAVE MANAGEMENT</span>

            <h2>Doctor Leaves</h2>

            <p>View doctor leave requests and filter them by date or reason.</p>

            <button
              type="button"
              className="doctor-add-leave-button"
              onClick={() => setIsModalOpen(true)}
            >
              Add Leave
            </button>
          </div>
        </section>

        {/* FILTERS */}

        <DoctorLeaveFilters
          search={searchInput}
          date={date}
          onSearchChange={setSearchInput}
          onDateChange={(value) => {
            setDate(value);
          }}
        />

        {/* CONTENT */}

        {isLoading ? (
          <div className="doctor-request-state">
            <div className="doctor-request-loader">
              <span />
              <span />
              <span />
            </div>

            <h3>Loading leaves</h3>

            <p>Fetching the latest doctor leaves.</p>
          </div>
        ) : error ? (
          <div className="doctor-request-state doctor-request-error">
            <div className="doctor-request-state-icon">!</div>

            <h3>Unable to load leaves</h3>

            <p>{error}</p>
          </div>
        ) : (
          <>
            {/* TABLE */}

            <DoctorLeaveTable
              leaves={leaves}
              onEdit={handleEditLeave}
              onDelete={handleDeleteLeave}
              isDeleting={isDeleting}
            />

            {/* PAGINATION */}

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(nextPage) => {
                console.log("Page:", nextPage);
              }}
            />
          </>
        )}

        {/* CREATE MODAL */}

        <CreateDoctorLeaveModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreateLeave}
          isLoading={isCreating}
        />

        {/* UPDATE MODAL */}

        <UpdateDoctorLeaveModal
          key={selectedLeave?.id ?? "update"}
          isOpen={isUpdateModalOpen}
          leave={selectedLeave}
          onClose={handleCloseUpdateModal}
          onSubmit={handleUpdateLeave}
          isLoading={isUpdating}
        />
      </div>
    </DoctorLayout>
  );
};

export default DoctorLeavePageList;
