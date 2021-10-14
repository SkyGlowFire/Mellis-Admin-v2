import { Autocomplete, TextField, TextFieldProps } from '@mui/material';
import { FC } from 'react';
import { UseControllerProps } from 'react-hook-form';
import { useFormContext, Controller } from 'react-hook-form';

interface MuiAutocompleteProps
  extends Omit<TextFieldProps, 'name' | 'error' | 'helperText'> {
  options: string[];
  name: UseControllerProps['name'];
}

const MuiAutocomplete: FC<MuiAutocompleteProps> = (props) => {
  const { options, name, ...otherProps } = props;
  const {
    formState: { errors },
    control,
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, ...props } }) => (
        <Autocomplete
          {...props}
          onChange={(e, data) => onChange(data)}
          freeSolo
          autoSelect
          options={options}
          getOptionLabel={(option) => option}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              {...otherProps}
              error={!!errors[name]?.message}
              helperText={errors[name] ? errors[name].message : null}
            />
          )}
        />
      )}
    />
  );
};

export default MuiAutocomplete;
