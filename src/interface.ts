import { ReactNode } from "react";
import { CircularProgressProps } from "@mui/material";

// Interface for components that accept children as props
export interface ChildrenPropsI {
  children: ReactNode;
}

// Interface for wrapping a module with a heading, children, and an optional button
export interface ModuleWrapperI {
  moduleHeading: string;
  children: ReactNode;
  buttonText?: string;
  showModuleBtn?: boolean;
  handleModuleBtn?: () => void;
}

// Interface for Button component properties with customizable styles and behavior
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

// Interface for form input values (email, password, and optional roles and username)
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
 * Interface for select dropdown component with various options (multi-select, searchable, loading state)
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

// Interface for custom modal component with open state and close handler
export interface CustomModalI {
  open: boolean;
  handleClose: () => void;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false;
  fullWidth: boolean;
  children: ReactNode;
}

// Interface for showing a loader overlay based on isLoading state
export interface LoaderOverlayI {
  isLoading: boolean;
}

// Interface for product modal state (open or closed)
export interface ProductsI {
  modalOpen: boolean;
}

// Interface for product form input values (category, description, image, etc.)
export interface ProductFormInputI {
  category: string;
  description: string;
  mainImage: string;
  name: string;
  price: string;
  stock: string;
}

// Interface for form component handling modal close action
export interface FormI {
  handleModalClose: () => void;
}

// Interface for loader component properties (for different types like section, table, button)
export interface LoaderPropsI {
  type?: "section" | "table" | "button";
  color?: CircularProgressProps["color"];
  size?: number;
  text?: string;
}

// Interface for managing file uploads (files and setter function for updating state)
export interface FilesI {
  files: any[];
  setFiles: React.Dispatch<React.SetStateAction<any[]>>;
}
