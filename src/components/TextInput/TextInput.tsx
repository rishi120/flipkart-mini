import React from "react";
import {
  TextField,
  InputAdornment,
  SxProps,
  Typography,
  Theme,
} from "@mui/material";
import "./TextInput.scss";

export interface TextInputI {
  type?: string;
  size?: "small" | "medium";
  label?: string;
  placeholder?: string;
  name?: string;
  value?: any;
  defaultValue?: any;
  helperText?: string | null;
  error?: boolean;
  disabled?: boolean;
  required?: boolean;
  multiline?: boolean;
  autoFocus?: boolean;
  rows?: string | number;
  minRows?: string | number;
  maxRows?: string | number;
  wrapperClassName?: string; // remove this line when this is removed from all used
  labelClassName?: string;
  className?: string;
  variant?: "outlined" | "standard" | "filled";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  preContent?: string | React.ReactNode;
  postContent?: string | React.ReactNode;
  autoComplete?: string;
  sx?: SxProps<Theme>;
  labelsx?: SxProps<Theme>;
  formControlSx?: SxProps;
  preContentSx?: SxProps;
  postContentSx?: SxProps;
  inputProps?: any;
  onFocus?: (e: any) => void;
  onBlur?: (e: any) => void;
  inputRef?: any;
  onKeyDown?: (e: any) => void;
  onPaste?: (e: any) => void;
}

const TextInput = (props: TextInputI) => {
  const {
    type,
    size,
    label,
    placeholder,
    name,
    value,
    defaultValue,
    helperText,
    error,
    variant,
    disabled,
    required,
    multiline,
    rows,
    minRows,
    maxRows,
    preContent,
    postContent,
    onChange,
    autoComplete,
    sx,
    preContentSx,
    postContentSx,
    onFocus,
    onBlur,
    inputRef,
    autoFocus,
  } = props;

  return (
    <div className="text-input-wrapper">
      {label && (
        <Typography className="input-label">
          {label} {required && <span>*</span>}
        </Typography>
      )}
      <TextField
        {...props}
        autoComplete={autoComplete}
        sx={sx}
        className="custom-textfield"
        fullWidth
        hiddenLabel
        required={false}
        label=""
        id={`text-input-${name ?? "box"}`}
        type={type ?? "text"}
        size={size ?? "small"}
        variant={variant ?? "outlined"}
        placeholder={placeholder}
        name={name}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        error={error}
        disabled={disabled}
        multiline={multiline}
        helperText={null}
        rows={rows}
        minRows={minRows}
        maxRows={maxRows}
        onFocus={onFocus}
        onBlur={onBlur}
        autoFocus={autoFocus}
        InputProps={{
          startAdornment: preContent ? (
            <InputAdornment position="start" sx={preContentSx}>
              {preContent}
            </InputAdornment>
          ) : null,
          endAdornment: postContent ? (
            <InputAdornment position="end" sx={postContentSx}>
              {postContent}
            </InputAdornment>
          ) : null,
        }}
        inputRef={inputRef}
      />
      {error && helperText ? (
        <Typography className="error-text">{helperText}</Typography>
      ) : null}
    </div>
  );
};

export default TextInput;
