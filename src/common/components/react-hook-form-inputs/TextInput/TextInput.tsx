import { useFormContext } from 'react-hook-form';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import { FC } from 'react';

const useStyles = makeStyles(() => ({
  root: {},
}));

export interface TextInputProps
  extends Omit<TextFieldProps, 'name' | 'error' | 'helperText'> {
  name: `${string}` | `${string}.${string}` | `${string}.${number}`;
}

const TextInput: FC<TextInputProps> = (props) => {
  const { name, className, variant, InputLabelProps, ...rest } = props;
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const classes = useStyles();
  return (
    <TextField
      InputLabelProps={{ ...InputLabelProps, style: { fontSize: '.8rem' } }}
      {...rest}
      variant={variant as any}
      {...register(name)}
      className={clsx(classes.root, className)}
      helperText={errors[name] ? errors[name].message : null}
      error={!!errors[name]?.message}
    />
  );
};

export default TextInput;
