import axiosInstance from "@/services/axios";
import {
  ExternalLink,
  FileCheck2,
  FileText,
  Image as ImageIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

interface DocumentCardProps {
  title: string;
  fileKey: string;
  type: "image" | "pdf";
  onImageClick?: (url: string, title: string) => void;
}

const DocumentCard = ({
  title,
  fileKey,
  type,
  onImageClick,
}: DocumentCardProps) => {
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSignedUrl = async () => {
      try {
        setLoading(true);

        const response = await axiosInstance.get("/admin/doctor-request/file", {
          params: {
            key: fileKey,
          },
        });

        setSignedUrl(response.data.result.url);
      } catch (error) {
        console.error("Failed to get signed URL:", error);
      } finally {
        setLoading(false);
      }
    };

    if (fileKey) {
      getSignedUrl();
    }
  }, [fileKey]);

  return (
    <article>
      <div className="document-preview">
        {type === "image" ? (
          <button
            type="button"
            className="document-image-button"
            disabled={!signedUrl}
            onClick={() => {
              if (signedUrl) {
                onImageClick?.(signedUrl, title);
              }
            }}
          >
            {signedUrl ? (
              <img src={signedUrl} alt={title} className="document-image" />
            ) : (
              <div className="document-image-loading">
                {loading ? "Loading..." : "Unable to load image"}
              </div>
            )}

            <span className="document-image-overlay">
              <ImageIcon size={18} />
              {loading ? "Loading..." : "View Preview"}
            </span>
          </button>
        ) : (
          <div className="document-pdf-preview">
            <div className="document-pdf-icon">
              <FileText size={27} />
            </div>

            <span>{loading ? "LOADING..." : "PDF DOCUMENT"}</span>
          </div>
        )}
      </div>

      <div className="document-content">
        <div className="document-title-row">
          <div>
            <span className="document-type">
              {type === "image" ? "IMAGE" : "PDF"}
            </span>

            <h3>{title}</h3>
          </div>

          <FileCheck2 size={17} className="document-check" />
        </div>

        {type === "image" ? (
          <button
            type="button"
            disabled={!signedUrl}
            onClick={() => signedUrl && onImageClick?.(signedUrl, title)}
            className="document-action"
          >
            View Full Image
            <ExternalLink size={13} />
          </button>
        ) : (
          <a
            href={signedUrl ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="document-action"
            onClick={(e) => {
              if (!signedUrl) {
                e.preventDefault();
              }
            }}
          >
            {loading ? "Loading..." : "Open Document"}
            <ExternalLink size={13} />
          </a>
        )}
      </div>
    </article>
  );
};

export default DocumentCard;
