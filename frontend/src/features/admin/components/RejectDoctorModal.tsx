import { useState } from "react";
import { useAppDispatch } from "@/app/hooks/hooks";
import { rejectDoctorThunk } from "../redux/rejectDoctorThunk";


interface RejectDoctorModalProps {
  open: boolean;
  doctorRequestId: string;
  onClose: () => void;
}

const RejectDoctorModal = ({
  open,
  doctorRequestId,
  onClose,
}: RejectDoctorModalProps) => {
  const dispatch = useAppDispatch();

  const [reason, setReason] = useState("");

  if (!open) return null;

  const handleReject = async () => {
    if (!reason.trim()) return;

    const resultAction = await dispatch(
      rejectDoctorThunk({
        doctorRequestId,
        rejectReason: reason,
      })
    );

    if (rejectDoctorThunk.fulfilled.match(resultAction)) {
      setReason("");
      onClose();
    }
  };

  const handleClose = () => {
    setReason("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">

        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-semibold">
            Reject Doctor Request
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Provide a reason for rejection. This reason will be sent to the
            doctor in the retry email.
          </p>
        </div>

        <div className="px-6 py-5">
          <label className="mb-2 block text-sm font-medium">
            Rejection Reason
          </label>

          <textarea
            rows={5}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Explain why this application is being rejected..."
            className="w-full resize-none rounded-lg border border-slate-300 p-3 outline-none transition focus:border-blue-500"
          />
        </div>

        <div className="flex justify-end gap-3 border-t px-6 py-4">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg border border-slate-300 px-5 py-2 transition hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={!reason.trim()}
            onClick={handleReject}
            className="rounded-lg bg-red-600 px-5 py-2 text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectDoctorModal;