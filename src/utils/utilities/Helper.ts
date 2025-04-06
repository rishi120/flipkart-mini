import CustomToaster from "../../components/CustomToaster";
import { toast } from "react-toastify";

/**
 * Handles error messages and displays them using a custom toast with specific styling
 * @param errorMessage
 * @returns
 */
export const handleErrorCodes = (errorMessage: string) => {
  return toast.error(CustomToaster, {
    data: {
      title: "Failure!",
      text: errorMessage,
    },
    toastId: "errors1",
    style: {
      backgroundColor: "#FFE4E4",
      border: "1px solid #FF4747",
      width: "600px",
    },
  });
};

/**
 * Displays a success message using a custom toast with specific styling and dynamic toastId
 * @param toasterMessage
 * @param toastId
 * @returns
 */
export const showSuccessMessage = (toasterMessage: string, toastId: string) => {
  return toast.success(CustomToaster, {
    toastId,
    data: {
      title: "Success!",
      text: toasterMessage,
    },
    style: {
      backgroundColor: "#E0F8E1",
      border: "1px solid #2DCF34",
      width: "500px",
    },
  });
};

/**
 *  Regular expressions for validating password and email formats
 */
export const formFieldRegex = {
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/, // Password must include uppercase, lowercase, number, and special char
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Standard email format validation
};
