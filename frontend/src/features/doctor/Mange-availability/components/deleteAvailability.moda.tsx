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
          padding: "25px",
          width: "400px",
          borderRadius: "8px",
        }}
      >
        <h2>Delete Availability</h2>

        <p>
          Are you sure you want to delete the{" "}
          <strong>{dayOfWeek}</strong> availability?
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAvailabilityModal;