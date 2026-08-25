import { useEffect, useState } from "react";
import {
  CalendarPlus,
  Clock3,
  RefreshCw,
} from "lucide-react";

import AvailabilityCalendar from "../components/doctorAvail.calender";
import AvailabilityTable from "../components/doctorAvailability.table";
import AddAvailabilityModal from "../components/addAvilabilityModal";
import UpdateAvailabilityModal from "../components/updateAvailabilityModal";
import DeleteAvailabilityModal from "../components/deleteAvailability.moda";

import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import DoctorLayout from "@/layout/DoctorLayout";

import { fetchDoctorAvailability } from "../redux/getAvilableThunk";
import { createAvailability } from "../redux/createThunk";
import { updateAvailability } from "../redux/updateThunk";
import { deleteAvailability } from "../redux/delteThunk";

import type {
  CreateDoctorAvailability,
  UpdateDoctorAvailability,
} from "../types/addDoctorAvail.type";

import type { DoctorAvailability } from "../types/doctorAvail.type";

import "@/styles/doctor/doctorAvailability.css";

const ManageAvailability = () => {
  const dispatch = useAppDispatch();

  // ============================================
  // REDUX STATE
  // ============================================

  const {
    availability,
    isLoading,
    isCreating,
    isUpdating,
    isDeleting,
    error,
    createError,
    updateError,
    deleteError,
  } = useAppSelector((state) => state.availability);


  const [isAddModalOpen, setIsAddModalOpen] =
    useState(false);

  const [isUpdateModalOpen, setIsUpdateModalOpen] =
    useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] =
    useState(false);

  const [selectedAvailability, setSelectedAvailability] =
    useState<DoctorAvailability | null>(null);

  const [selectedForDelete, setSelectedForDelete] =
    useState<DoctorAvailability | null>(null);

  useEffect(() => {
    dispatch(fetchDoctorAvailability());
  }, [dispatch]);

  const activeAvailability =
    availability.filter(
      (item) =>
        item.isAvailable &&
        !item.isDeleted,
    );

  const handleCreateAvailability = async (
    data: CreateDoctorAvailability,
  ): Promise<string | null> => {
    const result = await dispatch(
      createAvailability(data),
    );

    if (
      createAvailability.fulfilled.match(
        result,
      )
    ) {
      setIsAddModalOpen(false);
      return null;
    }

    return (
      result.payload ??
      "Failed to create availability."
    );
  };

 
  const handleEditAvailability = (
    row: DoctorAvailability,
  ) => {
    setSelectedAvailability(row);
    setIsUpdateModalOpen(true);
  };

 
  const handleUpdateAvailability = async (
    id: string,
    data: UpdateDoctorAvailability,
  ): Promise<string | null> => {
    const result = await dispatch(
      updateAvailability({
        id,
        data,
      }),
    );

    if (
      updateAvailability.fulfilled.match(
        result,
      )
    ) {
      setIsUpdateModalOpen(false);
      setSelectedAvailability(null);

      return null;
    }

    return (
      result.payload ??
      "Failed to update availability."
    );
  };


  const handleDeleteAvailability = (
    row: DoctorAvailability,
  ) => {
    setSelectedForDelete(row);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedForDelete) {
      return;
    }

    const result = await dispatch(
      deleteAvailability(
        selectedForDelete.id,
      ),
    );

    if (
      deleteAvailability.fulfilled.match(
        result,
      )
    ) {
      setIsDeleteModalOpen(false);
      setSelectedForDelete(null);
    }
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedAvailability(null);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedForDelete(null);
  };

  
  return (
    <DoctorLayout
      title="Manage Availability"
      subtitle="Set the times when patients can book appointments with you."
    >
      <main className="availability-page">

        <section className="availability-hero">
          <div>
            <span className="availability-eyebrow">
              APPOINTMENT SCHEDULING
            </span>

            <h1>
              Manage your availability
            </h1>

            <p>
              Add and update your weekly
              consultation hours so patients can
              book at the right time.
            </p>
          </div>

          <button
            type="button"
            className="availability-add-button"
            onClick={() =>
              setIsAddModalOpen(true)
            }
          >
            <CalendarPlus size={18} />
            Add availability
          </button>
        </section>

        {(error) && (
          <div
            className="availability-alert availability-alert-error"
            role="alert"
          >
            <span>!</span>

            <p>
              {error ||
                createError ||
                updateError ||
                deleteError}
            </p>
          </div>
        )}

        {/* ======================================
            LOADING
        ====================================== */}

        {isLoading ? (
          <section className="availability-loading-card">

            <RefreshCw
              size={25}
              className="availability-spinner"
            />

            <h2>
              Loading your schedule
            </h2>

            <p>
              Please wait while your
              availability is retrieved.
            </p>

          </section>
        ) : (
          <div className="availability-content-grid">

            {/* ==================================
                TABLE
            ================================== */}

            <section className="availability-card availability-table-card">

              <div className="availability-card-header">

                <div className="availability-card-title">

                  <span className="availability-card-icon">
                    <Clock3 size={18} />
                  </span>

                  <div>
                    <h2>
                      Consultation hours
                    </h2>

                    <p>
                      Your active appointment
                      slots for patients.
                    </p>
                  </div>

                </div>

                <span className="availability-count">
                  {activeAvailability.length} active
                </span>

              </div>

              <AvailabilityTable
                availability={availability}
                onEdit={
                  handleEditAvailability
                }
                onDelete={
                  handleDeleteAvailability
                }
                isDeleting={isDeleting}
              />

            </section>

            {/* ==================================
                CALENDAR
            ================================== */}

            <aside className="availability-card availability-calendar-card">

              <div className="availability-card-header">

                <div className="availability-card-title">

                  <span className="availability-card-icon">
                    <CalendarPlus size={18} />
                  </span>

                  <div>
                    <h2>
                      Schedule preview
                    </h2>

                    <p>
                      Dates follow your weekly
                      availability.
                    </p>
                  </div>

                </div>

              </div>

              <AvailabilityCalendar
                availability={availability}
              />

              <div className="availability-calendar-legend">
                <span />
                Available for appointments
              </div>

            </aside>

          </div>
        )}

        {/* ======================================
            ADD MODAL
        ====================================== */}

        <AddAvailabilityModal
          isOpen={isAddModalOpen}
          onClose={() =>
            setIsAddModalOpen(false)
          }
          onSubmit={
            handleCreateAvailability
          }
          isLoading={isCreating}
        />

        {/* ======================================
            UPDATE MODAL
        ====================================== */}

        <UpdateAvailabilityModal
          isOpen={isUpdateModalOpen}
          availability={
            selectedAvailability
          }
          onClose={
            handleCloseUpdateModal
          }
          onSubmit={
            handleUpdateAvailability
          }
          isLoading={isUpdating}
        />


        <DeleteAvailabilityModal
          isOpen={isDeleteModalOpen}
          dayOfWeek={
            selectedForDelete?.dayOfWeek
          }
          isLoading={isDeleting}
          onClose={
            handleCloseDeleteModal
          }
          onConfirm={
            handleConfirmDelete
          }
        />

      </main>
    </DoctorLayout>
  );
};

export default ManageAvailability;