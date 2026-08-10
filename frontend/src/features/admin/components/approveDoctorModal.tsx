import { useEffect, useState } from "react";
import {
  Check,
  ChevronDown,
  Plus,
  X,
} from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/hooks/hooks";

import {
  getDepartmentsThunk,
  createDepartmentThunk,
} from "../redux/department.thunk";

import { approveDoctorThunk } from "../redux/approveDoctorThunk";

interface ApproveDoctorModalProps {
  open: boolean;
  doctorRequestId: string;
  onClose: () => void;
}

const ApproveDoctorModal = ({
  open,
  doctorRequestId,
  onClose,
}: ApproveDoctorModalProps) => {
  const dispatch = useAppDispatch();

  const {
    departments,
    loading,
  } = useAppSelector(
    (state) => state.department,
  );

  const [selectedDepartment, setSelectedDepartment] =
    useState("");

  const [newDepartment, setNewDepartment] =
    useState("");

  useEffect(() => {
    if (open) {
      dispatch(getDepartmentsThunk());
    }
  }, [dispatch, open]);

  if (!open) {
    return null;
  }

  const handleCreateDepartment = async () => {
    if (!newDepartment.trim()) {
      return;
    }

    const resultAction = await dispatch(
      createDepartmentThunk({
        name: newDepartment.trim(),
      }),
    );

    if (
      createDepartmentThunk.fulfilled.match(
        resultAction,
      )
    ) {
      setSelectedDepartment(
        resultAction.payload.id,
      );

      setNewDepartment("");
    }
  };

  const handleApprove = async () => {
    if (!selectedDepartment) {
      return;
    }

    const resultAction = await dispatch(
      approveDoctorThunk({
        doctorRequestId,
        departmentId: selectedDepartment,
      }),
    );

    if (
      approveDoctorThunk.fulfilled.match(
        resultAction,
      )
    ) {
      onClose();
    }
  };

  const handleClose = () => {
    setNewDepartment("");
    setSelectedDepartment("");
    onClose();
  };

  return (
    <div
      className="doctor-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="approve-doctor-title"
    >
      <div className="doctor-modal">

        <div className="doctor-modal-header">

          <div className="doctor-modal-heading">

            <div className="doctor-modal-icon doctor-modal-icon-success">
              <Check size={19} />
            </div>

            <div>
              <span>
                APPLICATION REVIEW
              </span>

              <h2 id="approve-doctor-title">
                Approve Doctor
              </h2>
            </div>

          </div>

          <button
            type="button"
            onClick={handleClose}
            className="doctor-modal-close"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

        </div>


        <div className="doctor-modal-body">

          <p className="doctor-modal-description">
            Select the department this doctor will
            belong to before approving the application.
          </p>


          <div className="doctor-modal-field">

            <label>
              Department
            </label>

            <div className="doctor-select-wrapper">

              <select
                value={selectedDepartment}
                onChange={(event) =>
                  setSelectedDepartment(
                    event.target.value,
                  )
                }
              >
                <option value="">
                  Select Department
                </option>

                {departments.map(
                  (department) => (
                    <option
                      key={department.id}
                      value={department.id}
                    >
                      {department.name}
                    </option>
                  ),
                )}
              </select>

              <ChevronDown
                size={16}
              />

            </div>

          </div>


          <div className="doctor-modal-divider">
            <span />
            OR
            <span />
          </div>


          <div className="doctor-modal-field">

            <label>
              Create New Department
            </label>

            <div className="doctor-create-department">

              <input
                value={newDepartment}
                onChange={(event) =>
                  setNewDepartment(
                    event.target.value,
                  )
                }
                placeholder="Enter department name"
              />

              <button
                type="button"
                onClick={
                  handleCreateDepartment
                }
                disabled={
                  !newDepartment.trim()
                }
              >
                <Plus size={15} />
                Create
              </button>

            </div>

          </div>

        </div>


        <div className="doctor-modal-footer">

          <button
            type="button"
            onClick={handleClose}
            className="doctor-modal-cancel"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={
              loading ||
              !selectedDepartment
            }
            onClick={handleApprove}
            className="doctor-modal-confirm doctor-modal-confirm-success"
          >
            <Check size={16} />

            {loading
              ? "Approving..."
              : "Approve Doctor"}
          </button>

        </div>

      </div>
    </div>
  );
};

export default ApproveDoctorModal;