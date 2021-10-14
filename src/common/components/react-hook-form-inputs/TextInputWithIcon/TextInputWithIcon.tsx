import { ReactElement, FC } from 'react';
import TextInput, { TextInputProps } from '../TextInput/TextInput';
import InputAdornment from '@mui/material/InputAdornment';

interface TextInputWithStartIconProps extends TextInputProps {
  startIcon?: ReactElement;
  endIcon?: ReactElement;
}

const TextInputWithIcon: FC<TextInputWithStartIconProps> = (props) => {
  const { startIcon, endIcon, InputProps, ...rest } = props;
  return (
    <TextInput
      {...rest}
      InputProps={{
        ...InputProps,
        startAdornment: startIcon ? (
          <InputAdornment position="start">{startIcon}</InputAdornment>
        ) : null,
        endAdornment: endIcon ? (
          <InputAdornment position="end">{endIcon}</InputAdornment>
        ) : null,
      }}
      variant="outlined"
    />
  );
};

export default TextInputWithIcon;
