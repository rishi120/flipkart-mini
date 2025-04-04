import CustomToaster from "../../components/CustomToaster";
import { toast } from "react-toastify";

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
