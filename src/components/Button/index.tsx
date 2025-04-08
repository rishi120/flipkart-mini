/** third party imports */
import Button from "@mui/material/Button";
/** local imports */
import { ButtonInterfaceI } from "../../interface";
import "./Button.scss";
import { COLOR_MAP } from "../../constants";

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
  const buttonColor = color ? COLOR_MAP[color] : undefined;
  const buttonBorderColor = btnBorder ? COLOR_MAP[btnBorder] : undefined;
  const buttonTextColor = textColor ? COLOR_MAP[textColor] : undefined;

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
