import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";

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

  const { departments, loading } = useAppSelector(
    (state) => state.department
  );
console.log("dep",departments)
  const [selectedDepartment, setSelectedDepartment] =
    useState("");

  const [newDepartment, setNewDepartment] =
    useState("");

  useEffect(() => {
    if (open) {
      dispatch(getDepartmentsThunk());
    }
  }, [dispatch, open]);

  if (!open) return null;

  const handleCreateDepartment = async () => {
    if (!newDepartment.trim()) return;

    const resultAction = await dispatch(
      createDepartmentThunk({
        name: newDepartment,
      })
    );

    if (createDepartmentThunk.fulfilled.match(resultAction)) {
      setSelectedDepartment(resultAction.payload.id);
      setNewDepartment("");
    }
  };

  const handleApprove = async () => {
    if (!selectedDepartment) return;
    const resultAction = await dispatch(
       
      approveDoctorThunk({
        doctorRequestId,
        departmentId: selectedDepartment,
      })
    );

    if (approveDoctorThunk.fulfilled.match(resultAction)) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">

        <h2 className="mb-6 text-xl font-semibold">
          Approve Doctor
        </h2>

        <div className="space-y-4">

          <div>
            <label className="mb-2 block text-sm font-medium">
              Department
            </label>

            <select
              value={selectedDepartment}
              onChange={(e) =>
                setSelectedDepartment(e.target.value)
              }
              className="w-full rounded-lg border p-3"
            >
              <option value="">
                Select Department
              </option>

              {departments.map((department) => (
              
                <option
                  key={department.id}
                  value={department.id}
                >
                  {department.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="px-3 text-sm text-slate-500">
              OR
            </span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Add New Department
            </label>

            <div className="flex gap-2">
              <input
                value={newDepartment}
                onChange={(e) =>
                  setNewDepartment(e.target.value)
                }
                className="flex-1 rounded-lg border p-3"
                placeholder="Department Name"
              />

              <button
                type="button"
                onClick={handleCreateDepartment}
                className="rounded-lg bg-blue-600 px-4 text-white hover:bg-blue-700"
              >
                Create
              </button>
            </div>
          </div>

        </div>

        <div className="mt-8 flex justify-end gap-3">

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border px-5 py-2"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={
              loading || !selectedDepartment
            }
            onClick={handleApprove}
            className="rounded-lg bg-green-600 px-5 py-2 text-white disabled:opacity-50"
          >
            Approve
          </button>

        </div>
      </div>
    </div>
  );
};

export default ApproveDoctorModal;