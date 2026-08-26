import "@/styles/doctor/deleteLeaveModal.css"

interface DeleteLeaveConfirmModalProps {
  isOpen: boolean;
  leaveReason?: string;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteLeaveConfirmModal = ({
  isOpen,
  leaveReason,
  isDeleting,
  onClose,
  onConfirm,
}: DeleteLeaveConfirmModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container delete-modal">
        {/* HEADER */}
        <div className="modal-header">
          <h2>Delete Leave</h2>

          <button
            type="button"
            className="modal-close-button"
            onClick={onClose}
            disabled={isDeleting}
          >
            ×
          </button>
        </div>

        {/* CONTENT */}
        <div className="delete-modal-content">
          <p>Are you sure you want to delete this leave?</p>

          {leaveReason && (
            <p>
              Reason: <strong>{leaveReason}</strong>
            </p>
          )}

          <p className="delete-warning">This action cannot be undone.</p>
        </div>

        {/* BUTTONS */}
        <div className="modal-actions">
          <button
            type="button"
            className="modal-cancel-button"
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </button>

          <button
            type="button"
            className="modal-delete-button"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteLeaveConfirmModal;
