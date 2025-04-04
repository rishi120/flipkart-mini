import { ReactNode } from "react";

export interface ChildrenPropsI {
  children: ReactNode;
}

export interface ButtonInterfaceI {
  btnWidth?: string;
  btnHeight?: string;
  color?: string;
  variant: "text" | "contained" | "outlined";
  onClick?: () => void;
  children: ReactNode;
  radius?: string;
  btnBorder?: string;
  textColor?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  form?: string;
}

export interface IFormInput {
  email: string;
  password: string;
  roles?: any[];
  userName?: string;
}

/**
 * Shared type for dropdown options
 */
export interface DropdownOption {
  labelId?: number;
  label: string;
  value: string;
  name?: string;
}

/**
 * select dropdown interface
 */

export interface SelectDropdownI {
  dropdownOptions: DropdownOption[];
  isMulti?: boolean;
  isDisabled?: boolean;
  isSearchable?: boolean;
  isLoading?: boolean;
  defaultValue?: Record<string, any>;
  handleSelectDropdown: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: Record<string, any> | any[];
  id?: number | string;
}

export interface CustomModalI {
  modalHeading: string;
  open: boolean;
  handleClose: () => void;
  modalParagraph: string;
  buttonLabel: string;
  handleModalClose: () => void;
  isLoading: boolean;
}
