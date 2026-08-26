import "@/styles/admin/patientStatusMOdal.css";

interface PatientStatusModalProps {
  isOpen: boolean;
  patientName: string;
  action: "BLOCK" | "ACTIVE";
  isLoading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const PatientStatusModal = ({
  isOpen,
  patientName,
  action,
  isLoading = false,
  onClose,
  onConfirm,
}: PatientStatusModalProps) => {
  if (!isOpen) return null;

  const isBlocking = action === "BLOCK";

  return (
    <div className="patient-status-modal-overlay">
      <div className="patient-status-modal">
        <div
          className={`patient-status-modal-icon ${
            isBlocking ? "block" : "active"
          }`}
        >
          {isBlocking ? "!" : "✓"}
        </div>

        <div className="patient-status-modal-content">
          <h2>{isBlocking ? "Block Patient" : "Activate Patient"}</h2>

          <p>
            Are you sure you want to{" "}
            <strong>{isBlocking ? "block" : "activate"}</strong>{" "}
            <strong>{patientName}</strong>?
          </p>

          <p className="patient-status-modal-warning">
            {isBlocking
              ? "The patient will not be able to access their account while blocked."
              : "The patient will be able to access their account again."}
          </p>
        </div>

        <div className="patient-status-modal-actions">
          <button
            type="button"
            className="patient-status-modal-cancel"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </button>

          <button
            type="button"
            className={`patient-status-modal-confirm ${
              isBlocking ? "block" : "active"
            }`}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading
              ? isBlocking
                ? "Blocking..."
                : "Activating..."
              : isBlocking
                ? "Block Patient"
                : "Activate Patient"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientStatusModal;
