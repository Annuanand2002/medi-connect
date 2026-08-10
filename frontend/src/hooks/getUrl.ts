import { useEffect, useState } from "react";
import axiosInstance from "@/services/axios";

const useSignedUrl = (fileKey?: string) => {
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!fileKey) return;

    let cancelled = false;

    const getSignedUrl = async () => {
      try {
        setLoading(true);

        const response = await axiosInstance.get(
          "/admin/doctor-request/file",
          {
            params: {
              key: fileKey,
            },
          }
        );

          setSignedUrl(response.data.result.url);
      } catch (error) {
        if (!cancelled) {
          console.error("Failed to get signed URL:", error);
          setSignedUrl(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    getSignedUrl();

    return () => {
      cancelled = true;
    };
  }, [fileKey]);

  return {
    signedUrl: fileKey ? signedUrl : null,
    loading,
  };
};

export default useSignedUrl;