import "@/styles/doctor/deleteModal.css"

interface DeleteAvailabilityModalProps {
  isOpen: boolean;
  dayOfWeek?: string;
  isLoading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteAvailabilityModal = ({
  isOpen,
  dayOfWeek,
  isLoading,
  onClose,
  onConfirm,
}: DeleteAvailabilityModalProps) => {
  if (!isOpen) {
    return null;
  }


return (
  <div className="delete-modal-overlay">
    <div className="delete-modal">
      <div className="delete-modal-header">
        <div className="delete-warning-icon">!</div>

        <h2>Delete Availability</h2>
      </div>

      <p className="delete-modal-message">
        Are you sure you want to delete the{" "}
        <strong>{dayOfWeek}</strong> availability?
      </p>


      <div className="delete-modal-actions">
        <button
          type="button"
          onClick={onClose}
          disabled={isLoading}
          className="delete-cancel-btn"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={onConfirm}
          disabled={isLoading}
          className="delete-confirm-btn"
        >
          {isLoading ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  </div>
);
};

export default DeleteAvailabilityModal;