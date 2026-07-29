import { FileText } from "lucide-react";

interface DocumentCardProps {
  title: string;
  url: string;
  type: "image" | "pdf";
  onImageClick?: (url: string, title: string) => void;
}

const DocumentCard = ({
  title,
  url,
  type,
  onImageClick,
}: DocumentCardProps) => {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      {type === "image" ? (
        <img
          src={url}
          alt={title}
          className="h-52 w-full cursor-pointer object-cover"
          onClick={() => onImageClick?.(url, title)}
        />
      ) : (
        <div className="flex h-52 items-center justify-center bg-slate-100">
          <FileText
            size={70}
            className="text-red-500"
          />
        </div>
      )}

      <div className="p-4">
        <h3 className="font-medium text-slate-800">
          {title}
        </h3>

        {type === "image" ? (
          <button
            type="button"
            onClick={() => onImageClick?.(url, title)}
            className="mt-2 text-sm font-medium text-blue-600 hover:underline"
          >
            View Full Image
          </button>
        ) : (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-sm font-medium text-blue-600 hover:underline"
          >
            Open Document
          </a>
        )}
      </div>
    </div>
  );
};

export default DocumentCard;