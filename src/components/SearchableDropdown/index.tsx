import React, { forwardRef, useMemo } from "react";
import { Box, styled } from "@mui/material";
import ReactSelect, { StylesConfig } from "react-select";
import CreatableSelect from "react-select/creatable";
import EllipsisText from "react-ellipsis-text";
import styles from "./SearchableDropdown.module.scss";

type OptionType = {
  label: string;
  value: string;
  email?: string;
};

type SearchableDropDownProps = {
  label?: string;
  options?: OptionType[];
  onChange?: (value: OptionType | OptionType[] | null) => void;
  value?: OptionType | OptionType[] | null;
  placeholder?: string;
  error?: boolean;
  helperText?: string | null;
  menuPortalTarget?: HTMLElement | null;
  isDisabled?: boolean;
  avatarLabel?: boolean;
  isClearable?: boolean;
  isSearchable?: boolean;
  hideIndicator?: boolean;
  isMulti?: boolean;
  getOptionValue?: (option: OptionType) => string;
  getOptionLabel?: (option: OptionType) => string;
  controlShouldRenderValue?: boolean;
  hideSelectedOptions?: boolean;
  defaultValue?: OptionType | OptionType[] | null;
  type?: "creatable" | "asyncCreatable" | "asyncPaginate" | "default";
  loadOptions?: (inputValue: string) => Promise<OptionType[]>;
  cacheOptions?: boolean;
  defaultOptions?: boolean;
  debounceTimeout?: number;
  additional?: any;
  menuHeight?: string;
  closeMenuOnScroll?: boolean;
  menuShouldBlockScroll?: boolean;
  menuPlacement?: "auto" | "top" | "bottom";
  backspaceRemovesValue?: boolean;
  cacheUniqs?: any;
  noBorder?: boolean;
  labelLength?: number;
  emailLength?: number;
  precontent?: React.ReactNode;
  height?: string;
  required?: boolean;
  isLoading?: boolean;
};

const AvatarLabel = styled(Box)({
  display: "flex",
  alignItems: "center",
  ".email": {
    fontSize: "14px",
  },
});

export const SearchableDropDown = forwardRef<any, SearchableDropDownProps>(
  ({
    label,
    options = [],
    onChange,
    value,
    placeholder,
    error,
    helperText,
    menuPortalTarget,
    isDisabled,
    avatarLabel,
    isClearable,
    isSearchable = true,
    hideIndicator,
    isMulti,
    getOptionValue,
    getOptionLabel,
    controlShouldRenderValue,
    hideSelectedOptions,
    defaultValue,
    type,
    loadOptions,
    cacheOptions,
    defaultOptions,
    debounceTimeout,
    additional,
    menuHeight = "150px",
    closeMenuOnScroll,
    menuShouldBlockScroll,
    menuPlacement,
    backspaceRemovesValue,
    cacheUniqs,
    noBorder,
    labelLength = 20,
    emailLength = 20,
    precontent,
    height = "auto",
    required,
    isLoading,
    ...props
  }) => {
    const customStyles: StylesConfig = {
      menu: (base) => ({
        ...base,
        marginTop: "5px",
        backgroundColor: "#FFF",
        zIndex: 9999,
      }),
      option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? "white" : "black",
        minHeight: "35px",
        paddingTop: "10px",
        fontSize: "13px",
        opacity: state.isDisabled ? "0.5" : "1",
        cursor: state.isDisabled ? "not-allowed" : "pointer",
        backgroundColor: state.isSelected ? "#803667" : "white",
      }),
      control: (base, state) => ({
        ...base,
        width: "100%",
        padding: "0px 8px",
        fontSize: "14px",
        borderRadius: "4px",
        minHeight: "40px",
        height: height,
        cursor: "pointer",
        backgroundColor: state.isDisabled ? "#EBF0F0" : "#FFFFFF",
        boxShadow: "none",
        borderColor: state.isFocused ? "#a81972" : "#cccccc",
        borderWidth: state.isFocused ? "2px" : "1px",

        "&:hover": {
          borderColor: "#a81972",
        },
      }),
      dropdownIndicator: (base) => ({
        ...base,
        padding: "4px 0px 0px 4px",
        display: hideIndicator ? "none" : undefined,
      }),
    };

    const handleFormatOptionLabel = (data: OptionType) => {
      if (avatarLabel) {
        return (
          <AvatarLabel>
            <Box className="label">
              <EllipsisText
                text={data.label}
                length={labelLength}
                tooltip={data.label}
              />
              {data.email && (
                <Box className="email">
                  <EllipsisText
                    text={data.email}
                    length={emailLength}
                    tooltip={data.email}
                  />
                </Box>
              )}
            </Box>
          </AvatarLabel>
        );
      }
      return data.label;
    };

    const RenderComponent: any = useMemo(() => {
      if (type === "creatable") return CreatableSelect;
      return ReactSelect;
    }, [type]);

    return (
      <Box width="100%">
        {label && (
          <Box className={styles.InputLabelComponent}>
            {label} {required && <span>*</span>}
          </Box>
        )}
        <RenderComponent
          {...props}
          isMulti={isMulti}
          controlShouldRenderValue={controlShouldRenderValue}
          styles={customStyles}
          placeholder={placeholder}
          options={options}
          value={value}
          onChange={onChange}
          isDisabled={isDisabled}
          isClearable={isClearable}
          formatOptionLabel={handleFormatOptionLabel}
          loadOptions={loadOptions}
          cacheOptions={cacheOptions}
          defaultOptions={defaultOptions}
          menuPortalTarget={menuPortalTarget}
          isLoading={isLoading}
        />
        {error && helperText && (
          <p className={styles.errorText} color="error">
            {helperText}
          </p>
        )}
      </Box>
    );
  }
);
