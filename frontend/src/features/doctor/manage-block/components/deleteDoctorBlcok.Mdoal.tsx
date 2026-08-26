import "@/styles/doctor/deleteBlockModal.css"

interface DeleteBlockConfirmModalProps {
  isOpen: boolean;
  blockReason?: string;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteBlockConfirmModal = ({
  isOpen,
  blockReason,
  isDeleting,
  onClose,
  onConfirm,
}: DeleteBlockConfirmModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="delete-block-overlay">
      <div className="delete-block-modal">
        <div className="delete-block-header">
          <div className="delete-block-warning-icon">!</div>

          <h2>Delete Block</h2>
        </div>

        <p className="delete-block-message">
          Are you sure you want to delete this block?
        </p>

        {blockReason && (
          <div className="delete-block-reason">
            <span>Reason</span>
            <strong>{blockReason}</strong>
          </div>
        )}

        <p className="delete-block-warning">This action cannot be undone.</p>

        <div className="delete-block-actions">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="delete-block-cancel-btn"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="delete-block-confirm-btn"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBlockConfirmModal;
