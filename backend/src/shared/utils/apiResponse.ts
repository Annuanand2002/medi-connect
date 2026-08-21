interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

const sendResponse = <T>(
  message: string,
  data?: T,
): ApiResponse<T> => {
  return {
    success: true,
    message,
    data,
  };
};

export default sendResponse;
