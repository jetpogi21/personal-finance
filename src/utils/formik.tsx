import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Chip,
  createFilterOptions,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
  FilterOptionsState,
} from "@mui/material";

import { useField } from "formik";
import Link from "next/link";
import { KeyboardEvent, Ref, RefObject, useEffect, useRef } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import { BasicModel, ControlChoice } from "../interfaces/GeneralInterfaces";
import {
  convertDateToYYYYMMDD,
  convertStringToDate,
  findNameById,
  formatCurrency,
  formatCurrencyFromString,
  isValidCurrency,
} from "./utilities";
import { DateValidationError } from "@mui/x-date-pickers";
import { PickerChangeHandlerContext } from "@mui/x-date-pickers/internals/hooks/usePicker/usePickerValue.types";

const filter = createFilterOptions();

export interface MUIFileUploadProps {
  name: string;
  uploadName: string;
  [x: string]: any;
}

export const MUIFileUpload = ({
  name,
  uploadName,
  ...props
}: MUIFileUploadProps) => {
  const [field, meta, { setValue }] = useField(name);
  const handleFileUploadFields = useField(uploadName);
  const hasError = meta.touched && meta.error;

  const handleUpload = (e: React.FormEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files ? e.currentTarget.files[0] : false;
    if (file) {
      handleFileUploadFields[2].setValue(file);
      setValue(file.name);
    }
  };

  const handleDelete = () => {
    handleFileUploadFields[2].setValue(null);
    setValue("");
  };

  const hostLink = "http://localhost:3000";
  const filePath = `${hostLink}/${field.value.replace("files/", "")}`;

  return (
    <Stack direction="row" alignItems="center" gap={1}>
      {field.value && (
        <Box>
          <Link href={filePath} target="_blank">
            <Chip
              sx={{ "&:hover": { cursor: "pointer", opacity: 0.8 } }}
              color="success"
              label={field.value}
              onDelete={handleDelete}
            />
          </Link>
        </Box>
      )}
      <Button variant="contained" component="label" size="small">
        {field.value ? "Replace" : "Upload"}
        <input
          name={uploadName}
          hidden
          /* multiple */
          type="file"
          {...props}
          onChange={handleUpload}
        />
      </Button>
    </Stack>
  );
};

export interface MUIAutocompleteProp {
  label: string;
  items: BasicModel[];
  multiple: boolean;
  newInputHandler?: (arg0: { inputValue: string }) => void;
  freeSolo: boolean;
  name: string;
  setArrayTouched?: () => void;
  onUpdate?: () => void;
  [key: string]: unknown;
}

export const MUIAutocomplete = ({
  label,
  items,
  multiple,
  newInputHandler,
  freeSolo = true,
  setArrayTouched,
  onUpdate,
  ...props
}: MUIAutocompleteProp) => {
  const [field, meta, { setValue, setTouched }] = useField(props);

  const hasError = meta.touched && meta.error;

  const filterOptions = (options: any[], params: FilterOptionsState<any>) => {
    const filtered = filter(options, params);

    if (freeSolo) {
      const { inputValue } = params;
      // Suggest the creation of a new value
      const isExisting = options.some((option) => inputValue === option.name);
      if (inputValue !== "" && !isExisting) {
        filtered.push({
          inputValue,
          name: `Add "${inputValue}"`,
        });
      }
    }

    return filtered;
  };

  const processMultipleValues = async (newValue: unknown) => {
    if (!newValue || !Array.isArray(newValue)) {
      return [];
    }

    return await Promise.all(
      newValue.map(async (item) => {
        if (item.inputValue && newInputHandler) {
          //@ts-ignore
          return newInputHandler(item);
        } else {
          return item;
        }
      })
    );
  };

  const processSingleValue = async (newValue: unknown) => {
    if (!newValue) {
      return "";
    } else if (typeof newValue === "object" && "id" in newValue) {
      return newValue.id;
    } else {
      return newValue;
    }
  };

  const handleChange = async (event: any, newValue: { inputValue: string }) => {
    let processedValue;

    if (multiple) {
      processedValue = await processMultipleValues(newValue);
    } else {
      processedValue = await processSingleValue(newValue);
    }

    setValue(processedValue);
    setArrayTouched && setArrayTouched();
    setTouched(true);
  };

  //@ts-ignore
  const isOptionEqualToValue = (option, value) => {
    if (typeof value === "string") {
      return option.id.toString() === value;
    } else {
      return option.id.toString() === value.id.toString();
    }
  };

  //@ts-ignore
  const renderInput = (params) => {
    return (
      <TextField
        inputRef={(props.inputRef as Ref<any>) || undefined}
        error={!!hasError}
        helperText={meta.touched && meta.error ? meta.error : null}
        {...params}
        label={label}
      />
    );
  };

  useEffect(() => {
    onUpdate && onUpdate();
  }, [field.value]);

  const getAutoCompleteValue = (value: unknown, items: BasicModel[]) => {
    if (typeof value === "string") {
      return { id: value, name: findNameById(value, items) };
    } else if (typeof value === "number") {
      return { id: value, name: findNameById(value.toString(), items) };
    } else if (typeof value === "object" && value !== null && "id" in value) {
      return value as BasicModel;
    } else if (Array.isArray(value)) {
      return value as BasicModel[];
    } else {
      return "";
    }
  };

  const autoCompleteValue = getAutoCompleteValue(field.value, items);

  return (
    <FormControl fullWidth size="small" sx={{ borderColor: "danger.main" }}>
      <Autocomplete
        size="small"
        multiple={multiple}
        options={items}
        //@ts-ignore
        getOptionLabel={(option) => option.name || ""}
        value={autoCompleteValue}
        filterOptions={filterOptions}
        //@ts-ignore
        onChange={handleChange}
        isOptionEqualToValue={isOptionEqualToValue}
        freeSolo={freeSolo}
        renderInput={renderInput}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        autoHighlight
        autoSelect
      />
      {/* {hasError ? <FormHelperText>{meta.error}</FormHelperText> : null} */}
    </FormControl>
  );
};

export interface MUITextProp {
  label: string;
  name: string;
  setArrayTouched?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  setFocusOnLoad?: boolean;
  inputRef?: RefObject<HTMLInputElement> | undefined;
  [key: string]: unknown;
}

export const MUIText = ({
  label,
  setArrayTouched,
  onKeyDown,
  setFocusOnLoad = false,
  inputRef: propInputRef,
  ...props
}: MUITextProp) => {
  const [field, meta, { setValue }] = useField(props.name);
  const fieldValue = field.value || "";
  const [internalVal, setInternalVal] = useState(fieldValue);

  const inputRef = useRef<HTMLInputElement>(null);

  const hasError = meta.touched && meta.error;

  useEffect(() => {
    setInternalVal(fieldValue);
  }, [fieldValue]);

  useEffect(() => {
    if (inputRef && setFocusOnLoad) {
      inputRef.current?.focus();
    }
  }, [inputRef, setFocusOnLoad]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalVal(e.target.value);
  };

  const handleBlur = () => {
    internalVal && setArrayTouched && setArrayTouched();
    setValue(internalVal);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      //@ts-ignore
      setValue(e.target.value);
    }

    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  const { onChange, onBlur, value, ...otherField } = field;

  return (
    <FormControl fullWidth size="small">
      <TextField
        inputRef={propInputRef || inputRef}
        error={!!hasError}
        helperText={meta.touched && meta.error ? meta.error : null}
        label={label}
        variant="outlined"
        size="small"
        value={internalVal}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        {...otherField}
        {...props}
      />
    </FormControl>
  );
};

export interface MUINumber {
  label: string;
  name: string;
  setArrayTouched?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  allowDecimal?: boolean;
  [key: string]: unknown;
}

export const MUINumber = ({
  name,
  label,
  setArrayTouched,
  onKeyDown,
  allowDecimal = true,
  ...props
}: MUINumber) => {
  const [field, meta, { setValue }] = useField(name);

  const fieldValue = field.value ? formatCurrencyFromString(field.value) : "";

  const [internalVal, setInternalVal] = useState(fieldValue);

  useEffect(() => {
    setInternalVal(fieldValue);
  }, [fieldValue]);

  const hasError = meta.touched && meta.error;

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const regex = allowDecimal ? /^[0-9,.+]*$/ : /^[0-9,+]*$/;
    const newValue = e.target.value;

    if (regex.test(newValue)) {
      setInternalVal(newValue);
    }
  };

  const handleBlur = () => {
    internalVal && setArrayTouched && setArrayTouched();

    if (internalVal.includes("+")) {
      const values = internalVal.split("+").map((val) => parseFloat(val));

      const sum = values.reduce((acc, curr) => acc + curr, 0);
      setValue(sum.toFixed(2));
    } else if (isValidCurrency(internalVal)) {
      setValue(internalVal);
    } else {
      setValue("0.00");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      //@ts-ignore
      setValue(e.target.value);
    }

    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  const { onChange, onBlur, value, ...otherField } = field;

  return (
    <FormControl fullWidth size="small">
      <TextField
        inputRef={(props.inputRef as Ref<any>) || undefined}
        error={!!hasError}
        helperText={meta.touched && meta.error ? meta.error : null}
        label={label}
        variant="outlined"
        size="small"
        value={internalVal}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
          handleKeyDown(e)
        }
        inputProps={{
          inputMode: "numeric",
          pattern: allowDecimal ? "^\\d*\\.?\\d*$" : "^[0-9]*$",
        }}
        sx={{
          "& input": {
            textAlign: "right",
          },
        }}
        {...otherField}
        {...props}
      />
    </FormControl>
  );
};

export interface MUISwitchProp {
  label: string;
  name: string;
  setArrayTouched?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  [x: string]: any;
}

export const MUISwitch = ({ label, ...props }: MUISwitchProp) => {
  const [field, meta, { setValue }] = useField(props);

  const handleChange = () => {
    setValue(!field.value);
    props.setArrayTouched && props.setArrayTouched();
  };

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch
            onChange={handleChange}
            checked={field.value}
            onKeyDown={(e) => {
              if (props.onKeyDown) {
                props.onKeyDown(e);
              }
            }}
          />
        }
        label={label}
      />
    </FormGroup>
  );
};

export interface MUISelectProp {
  label: string;
  name: string;
  items: ControlChoice[];
  [x: string]: unknown;
}

export const MUISelect = ({ label, items, ...props }: MUISelectProp) => {
  const [field, meta, { setValue }] = useField(props);
  const fieldValue = field.value;
  const labelId = `${props.id || props.name}-label`;
  const [internalVal, setInternalVal] = useState(field.value);
  const hasError = meta.touched && meta.error;

  useEffect(() => {
    setInternalVal(fieldValue);
  }, [fieldValue]);

  // @ts-ignore
  const handleChange = (e) => {
    setInternalVal(e.target.value);
  };

  const handleBlur = () => {
    setValue(internalVal);
  };

  const { onChange, onBlur, value, ...otherField } = field;

  const createItems = () => {
    return items.map((item) => {
      if (item) {
        const { value, label } = item;
        return (
          <MenuItem key={label} value={value}>
            {label.charAt(0).toUpperCase() + label.slice(1)}
          </MenuItem>
        );
      }
    });
  };

  return (
    <FormControl fullWidth size="small" error={!!hasError}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        label={label}
        value={internalVal}
        onChange={handleChange}
        onBlur={handleBlur}
        {...otherField}
        {...props}
      >
        {createItems()}
      </Select>
      {hasError ? (
        <FormHelperText sx={{ color: "danger.main" }}>
          {meta.error}
        </FormHelperText>
      ) : null}
    </FormControl>
  );
};

export interface MUIRadioProp {
  label: string;
  name: string;
  items: ControlChoice[];
  radioProps?: any;
  row?: boolean;
  numColumns?: number;
  setArrayTouched?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  [x: string]: unknown;
}

export const MUIRadio = ({
  label,
  items,
  radioProps,
  row = true,
  numColumns = 1,
  setArrayTouched,
  onKeyDown,
  ...props
}: MUIRadioProp) => {
  const [field, meta, { setValue }] = useField(props);
  const fieldValue = field.value;
  const labelId = `${props.id || props.name}-label`;
  const [internalVal, setInternalVal] = useState(field.value);

  const hasError = meta.touched && meta.error;
  const showAsColumn = !row || (row && numColumns === 1);

  useEffect(() => {
    setInternalVal(fieldValue);
  }, [fieldValue]);

  // @ts-ignore
  const handleChange = (e) => {
    setInternalVal(e.target.value);
  };

  const handleBlur = () => {
    setArrayTouched && setArrayTouched();
    setValue(internalVal);
  };

  const { onChange, onBlur, value, ...otherField } = field;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    onKeyDown && onKeyDown(e);
  };

  const createItems = () => {
    return items.map((item) => {
      const { value, label } = item;
      return (
        <FormControlLabel
          sx={{
            textTransform: "capitalize",
          }}
          key={label}
          value={value}
          control={<Radio {...radioProps} onKeyDown={handleKeyDown} />}
          label={label}
        />
      );
    });
  };

  return (
    // @ts-ignore
    <FormControl error={hasError} sx={{ pr: row ? 2 : 0 }}>
      <FormLabel id={labelId}>{label}</FormLabel>
      <RadioGroup
        sx={{
          flexDirection: row ? "row" : "column",
          flexWrap: row ? "wrap" : "nowrap",
          "& .MuiFormControlLabel-root": {
            mr: showAsColumn ? 2 : 0,
            ml: -0.5,
            flexBasis: showAsColumn ? "auto" : `${100 / numColumns}%`,
            flexGrow: showAsColumn ? 0 : 1,
          },
          "& .MuiButtonBase-root": {
            p: 0.5,
          },
        }}
        aria-labelledby={labelId}
        value={internalVal}
        onChange={handleChange}
        onBlur={handleBlur}
        {...otherField}
        {...props}
      >
        {createItems()}
      </RadioGroup>
      {hasError ? <FormHelperText>{meta.error}</FormHelperText> : null}
    </FormControl>
  );
};

interface MUICheckboxProp {
  name: string;
  [key: string]: unknown;
}

export const MUICheckbox = ({ name, ...props }: MUICheckboxProp) => {
  const [field, meta, { setValue }] = useField(name);

  const checked = field.value;
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.checked);
  };

  return <Checkbox checked={checked} onChange={handleChange} {...props} />;
};

export interface MUICheckboxGroupProp {
  label: string;
  name: string;
  items: BasicModel[];
  cbProps: any;
  row: boolean;
  numColumns?: number;
  [x: string]: unknown;
}

export const MUICheckboxGroup = ({
  label,
  items,
  cbProps,
  row = false,
  numColumns = 1,
  ...props
}: MUICheckboxGroupProp) => {
  //this assumes that the shape of the field.value is in the form of [{id,name},{id,name}]
  const [field, meta, { setValue }] = useField(props);

  // @ts-ignore
  const handleChange = (e, id: string) => {
    if (e.target.checked) {
      // @ts-ignore
      setValue([...field.value, { id }]);
    } else {
      // @ts-ignore
      setValue(field.value.filter((item) => item.id !== id));
    }
  };

  return (
    <FormControl component="fieldset" variant="standard">
      <FormLabel component="legend">{label}</FormLabel>
      <FormGroup
        sx={{
          flexDirection: row ? "row" : "column",
          "& .MuiFormControlLabel-root": {
            mr: row && numColumns === 1 ? 2 : 0,
            ml: -0.5,
            flexBasis:
              row && numColumns === 1 ? "auto" : `${100 / numColumns}%`,
            flexGrow: row && numColumns === 1 ? 0 : 1,
          },
          "& .MuiButtonBase-root": {
            p: 0.5,
          },
        }}
      >
        {items?.map(({ id, name }) => {
          return (
            <FormControlLabel
              control={
                <Checkbox
                  {...cbProps}
                  checked={field.value
                    .map((item: any) => {
                      return item.id;
                    })
                    .includes(id.toString())}
                  onChange={(e) => handleChange(e, id.toString())}
                  name={name}
                />
              }
              key={id}
              label={<Typography>{name}</Typography>}
            />
          );
        })}
      </FormGroup>
    </FormControl>
  );
};

export interface MUIDatePickerProps {
  name: string;
  label: string;
  setArrayTouched?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  setFocusOnLoad?: boolean;
}

export const MUIDatePicker: React.FC<MUIDatePickerProps> = ({
  name,
  label,
  setArrayTouched,
  onKeyDown,
  setFocusOnLoad = false,
}) => {
  const [field, meta, { setValue }] = useField(name);

  const fieldValue = field.value ? convertStringToDate(field.value) : null;

  const [internalVal, setInternalVal] = useState(fieldValue);

  const hasError = Boolean(meta.touched && meta.error);

  const handleChange = (
    value: unknown,
    context: PickerChangeHandlerContext<DateValidationError>
  ) => {
    /* console.log({ value, context }); */

    if (value instanceof Date && context.validationError === null) {
      setArrayTouched && setArrayTouched();
      setValue(convertDateToYYYYMMDD(value));
    } else if (value === null) {
      setValue("");
    }
  };

  /* const handleBlur = () => {
    internalVal && setArrayTouched && setArrayTouched();
    setValue(convertDateToYYYYMMDD(internalVal as Date));
  }; */

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      //@ts-ignore
      setValue(e.target.value);
    }

    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  useEffect(() => {
    setInternalVal(fieldValue);
  }, [field.value]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (setFocusOnLoad && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <DatePicker
      label={label}
      value={internalVal}
      onChange={handleChange}
      onError={(e, v) => console.log({ error: e, value: v })}
      slotProps={{
        textField: {
          size: "small",
          /* onBlur: handleBlur, */
          onKeyDown: handleKeyDown,
          error: hasError,
          helperText: meta.error,
          inputRef: inputRef,
        },
      }}
    />
  );
};
