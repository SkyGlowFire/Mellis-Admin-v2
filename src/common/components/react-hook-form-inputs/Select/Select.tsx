import {
  Select,
  FormControl,
  Checkbox,
  InputLabel,
  MenuItem,
  FormHelperText,
  ListItemText,
  SelectProps,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { useFormContext, Controller } from 'react-hook-form';
import { FC } from 'react';

const useStyles = makeStyles({
  formControl: {
    minWidth: 140,
  },
  select: {},
});

const menuProps = {
  PaperProps: {
    style: {
      maxHeight: 150,
      // width: 250,
    },
  },
};

export type SelectOption = string | { value: string; label: string };

interface MySelectProps extends Omit<SelectProps, 'name'> {
  name: string;
  options: SelectOption[];
}

const MySelect: FC<MySelectProps> = (props) => {
  const classes = useStyles();
  const { name, className, options, label, multiple, style, ...otherProps } =
    props;
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const labelId = `${name}-label`;
  return (
    <FormControl
      className={clsx(classes.formControl, className)}
      error={Boolean(errors[name]?.message)}
      style={style}
    >
      {label && <InputLabel id={labelId}>{label}</InputLabel>}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            {...otherProps}
            displayEmpty
            labelId={labelId}
            label={label}
            multiple={multiple}
            MenuProps={menuProps}
            classes={{ root: classes.select }}
            renderValue={(selected) => {
              if (multiple) {
                const values = selected as SelectOption[];
                return (
                  (values &&
                    values
                      .map((option) =>
                        typeof option === 'object' ? option.label : option
                      )
                      .join(' / ')) ||
                  null
                );
              } else {
                const value = selected as SelectOption;
                return value && typeof value === 'object' ? value.label : value;
              }
            }}
          >
            {options.map((option) => {
              const value = typeof option === 'object' ? option.value : option;
              const label = typeof option === 'object' ? option.label : option;
              return (
                <MenuItem value={value} key={value}>
                  {multiple && (
                    <Checkbox
                      checked={field.value && field.value.includes(value)}
                      sx={{ padding: 0, marginRight: '8px' }}
                    />
                  )}
                  <ListItemText primary={label} />
                  {/* {label} */}
                </MenuItem>
              );
            })}
          </Select>
        )}
      />
      {errors[name] && <FormHelperText>{errors[name].message}</FormHelperText>}
    </FormControl>
  );
};

export default MySelect;
