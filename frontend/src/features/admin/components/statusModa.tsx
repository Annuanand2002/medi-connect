import "@/styles/admin/doctorSTastus.modal.css"

interface DoctorStatusModalProps {
  isOpen: boolean;
  doctorName: string;
  action: "BLOCK" | "ACTIVE";
  isLoading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DoctorStatusModal = ({
  isOpen,
  doctorName,
  action,
  isLoading = false,
  onClose,
  onConfirm,
}: DoctorStatusModalProps) => {
  if (!isOpen) return null;

  const isBlocking = action === "BLOCK";

  return (
    <div className="doctor-status-modal-overlay">
      <div className="doctor-status-modal">
        <div className="doctor-status-modal-icon">
          {isBlocking ? "!" : "✓"}
        </div>

        <div className="doctor-status-modal-content">
          <h2>
            {isBlocking ? "Block Doctor" : "Activate Doctor"}
          </h2>

          <p>
            Are you sure you want to{" "}
            <strong>
              {isBlocking ? "block" : "activate"}
            </strong>{" "}
            <strong>{doctorName}</strong>?
          </p>

          <p className="doctor-status-modal-warning">
            {isBlocking
              ? "The doctor will not be able to accept new appointments while blocked."
              : "The doctor will be able to accept appointments again."}
          </p>
        </div>

        <div className="doctor-status-modal-actions">
          <button
            type="button"
            className="doctor-status-modal-cancel"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </button>

          <button
            type="button"
            className={
              isBlocking
                ? "doctor-status-modal-confirm block"
                : "doctor-status-modal-confirm active"
            }
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading
              ? isBlocking
                ? "Blocking..."
                : "Activating..."
              : isBlocking
                ? "Block Doctor"
                : "Activate Doctor"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorStatusModal;