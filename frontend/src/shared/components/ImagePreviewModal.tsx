import { X } from "lucide-react";

interface ImagePreviewModalProps {
  isOpen: boolean;
  imageUrl: string;
  title: string;
  onClose: () => void;
}

const ImagePreviewModal = ({
  isOpen,
  imageUrl,
  title,
  onClose,
}: ImagePreviewModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] max-w-5xl overflow-hidden rounded-xl bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 rounded-full bg-white p-2 shadow hover:bg-slate-100"
        >
          <X size={20} />
        </button>

        <img
          src={imageUrl}
          alt={title}
          className="max-h-[90vh] max-w-full object-contain"
        />
      </div>
    </div>
  );
};

export default ImagePreviewModal;
