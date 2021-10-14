import { useFormContext } from 'react-hook-form';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { CSSProperties, FC, useState } from 'react';
import { InputProps } from '@mui/material';

interface PasswordInputProps {
  name: `${string}` | `${string}.${string}` | `${string}.${number}`;
  InputProps?: InputProps;
  className?: string;
  label?: string;
  fullWidth?: boolean;
  variant?: TextFieldProps['variant'];
  style?: CSSProperties;
}

const PasswordInput: FC<PasswordInputProps> = (props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const { name, children, InputProps, ...rest } = props;

  function togglePasswordVisibility() {
    setShowPassword((prev) => !prev);
  }

  return (
    <TextField
      {...rest}
      InputLabelProps={{ style: { fontSize: '.8rem' } }}
      type={showPassword ? 'text' : 'password'}
      helperText={errors[name] ? errors[name].message : null}
      error={!!errors[name]?.message}
      {...register(name)}
      InputProps={{
        ...InputProps,
        startAdornment: (
          <InputAdornment position="start">
            <IconButton
              aria-label="toggle password visibility"
              onClick={togglePasswordVisibility}
              edge="end"
              size="small"
            >
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </InputAdornment>
        ),
        inputProps: {
          style: { paddingLeft: '.5rem' },
          autoComplete: 'new-password',
        },
      }}
    />
  );
};

export default PasswordInput;
