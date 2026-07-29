interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

const sendResponse = <T>(
  success: boolean,
  message: string,
  data?: T,
): ApiResponse<T> => {
  return {
    success,
    message,
    data,
  };
};
export default sendResponse;
