import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControlProps,
  SelectChangeEvent,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { CSSProperties, FC } from 'react';

const useStyles = makeStyles({
  dense: {
    padding: '4px',
  },
});

interface MySelectProps {
  value: string | number | null;
  onChange: (val: any) => void;
  name?: string;
  options:
    | Array<{ value: string | number; label: string }>
    | Array<string | number>;
  error?: string | null;
  label?: string;
  variant?: FormControlProps['variant'];
  style?: CSSProperties;
  className?: string;
  dense?: boolean;
}

const MySelect: FC<MySelectProps> = (props) => {
  const {
    value,
    onChange,
    name,
    options,
    label,
    error,
    className,
    variant,
    style,
  } = props;
  const classes = useStyles();

  const changeHandler = (e: SelectChangeEvent<unknown>) => {
    const value = e.target.value;
    onChange(value);
  };

  return (
    <FormControl
      variant={variant || 'standard'}
      style={{ minWidth: 140, ...style }}
      className={className}
      error={Boolean(error)}
      sx={{ padding: 0 }}
    >
      {label && <InputLabel>{label}</InputLabel>}
      <Select
        value={value}
        onChange={changeHandler}
        name={name}
        classes={{ root: classes.dense, outlined: classes.dense }}
      >
        {options.map((option) => {
          if (typeof option === 'object') {
            return (
              <MenuItem value={option.value} key={`option-${option.value}`}>
                {option.label}
              </MenuItem>
            );
          } else {
            return (
              <MenuItem value={option} key={`option-${option}`}>
                {option}
              </MenuItem>
            );
          }
        })}
      </Select>
      {Boolean(error) && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default MySelect;
