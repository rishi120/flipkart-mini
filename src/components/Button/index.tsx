import Button from "@mui/material/Button";
import { ButtonInterfaceI } from "../../interface";
import "./Button.scss";

const CustomButton = ({
  variant,
  children,
  btnWidth,
  btnHeight,
  color,
  onClick,
  radius,
  btnBorder,
  textColor,
  type,
  disabled,
  form,
}: ButtonInterfaceI) => {
  const colorMap = {
    nuetral1: "#FFFFFF", // neutral1
    nuetral2: "#EBF0F0", // neutral2
    nuetral3: "#CACFCF", // neutral3
    nuetral4: "#898C8C", // neutral4
    nuetral5: "#5A5C5C", // neutral5
    nuetral6: "#313232", // neutral6

    /** backgrounds **/
    black: "#000000", // black

    /** success colors **/
    success1: "#E0F8E1", // success1
    success2: "#2DCF34", // success2

    /** error colors **/
    error1: "#FFE4E4", // error1
    error2: "#FF4747", // error2

    /** warning colors **/
    warning1: "#FFF2E4", // warning1
    warning2: "#FDAA4C", // warning2

    /** primary colors **/
    primary1: "#F7E6F2", // primary1
    primary2: "#803667", // primary2
    primary3: "#592648", // primary3

    /** secondary colors **/
    secondary1: "#214E85", // secondary1
    secondary2: "#F0BC24", // secondary2
    secondary3: "#0F9299", // secondary3
    secondary4: "#C7D3E0", // secondary4
    secondary5: "#FBEEC8", // secondary5
    secondary6: "#C3E4E5", // secondary6
  };

  const buttonColor = colorMap[color as keyof typeof colorMap];
  const buttonBorderColor = colorMap[btnBorder as keyof typeof colorMap];
  const buttonTextColor = colorMap[textColor as keyof typeof colorMap];

  return (
    <Button
      variant={variant}
      sx={{
        backgroundColor: buttonColor,
        width: btnWidth,
        height: btnHeight,
        borderRadius: radius,
        color: buttonTextColor,
        border: `1px solid ${buttonBorderColor}`,
      }}
      className="btnCustomStyles"
      onClick={onClick}
      type={type}
      disabled={disabled}
      form={form}
    >
      {children}
    </Button>
  );
};
export default CustomButton;
