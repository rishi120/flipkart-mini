import { ReactNode } from "react";
import { CircularProgressProps } from "@mui/material";

export interface ChildrenPropsI {
  children: ReactNode;
}

export interface ModuleWrapperI {
  moduleHeading: string;
  children: ReactNode;
  moduleButtons?: Record<string, any>;
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
  open: boolean;
  handleClose: () => void;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false;
  fullWidth: boolean;
  children: ReactNode;
}

export interface LoaderOverlayI {
  isLoading: boolean;
}

export interface ProductsI {
  modalOpen: boolean;
}

export interface ProductFormInputI {
  category: string;
  description: string;
  mainImage: string;
  name: string;
  price: string;
  stock: string;
}

export interface FormI {
  handleModalClose: () => void;
}

export interface LoaderPropsI {
  type?: "section" | "table" | "button";
  color?: CircularProgressProps["color"];
  size?: number;
  text?: string;
}

export interface FilesI {
  files: any[];
  setFiles: React.Dispatch<React.SetStateAction<any[]>>;
}
