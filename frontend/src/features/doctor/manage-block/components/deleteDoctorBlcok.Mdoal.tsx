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
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "30px",
          width: "400px",
          maxWidth: "90%",
          borderRadius: "8px",
        }}
      >
        <h2>Delete Block</h2>

        <p>Are you sure you want to delete this Block?</p>

        {blockReason && (
          <p>
            Reason: <strong>{blockReason}</strong>
          </p>
          
        )}
        <p>This action cannot be undone.</p>

        <div className="flex items-center gap-2">
          <button type="button" onClick={onClose} disabled={isDeleting}>
            Cancel
          </button>

          <button type="button" onClick={onConfirm} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBlockConfirmModal;
