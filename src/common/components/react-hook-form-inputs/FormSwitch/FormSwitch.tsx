import { FormControlLabel, Switch } from '@mui/material';
import { CSSProperties, FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface FormSwitchProps {
  name: string;
  className?: string;
  label: string;
  style?: CSSProperties;
}

const FormSwitch: FC<FormSwitchProps> = (props) => {
  const { control } = useFormContext();
  const { name, className, label, style } = props;
  return (
    <FormControlLabel
      label={label}
      className={className}
      style={style}
      control={
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <Switch
              color="success"
              checked={value}
              onChange={(e) => onChange(e.target.checked)}
            />
          )}
        />
      }
    />
  );
};

export default FormSwitch;
