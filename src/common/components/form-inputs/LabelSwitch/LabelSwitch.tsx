import FormControlLabel, {
  FormControlLabelProps,
} from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { withStyles } from '@mui/styles';
import { FC } from 'react';

const GreenSwitch = withStyles((theme) => ({
  switchBase: {
    color: theme.palette.error.main,
    '& + $track': {
      backgroundColor: theme.palette.error.light,
    },
    '&$checked': {
      color: theme.palette.success.main,
    },
    '&$checked + $track': {
      backgroundColor: theme.palette.success.light,
    },
    '&.Mui-disabled': {},
  },
  checked: {},
  track: {},
}))(Switch);

interface LabelSwitchProps extends Omit<FormControlLabelProps, 'control'> {
  size?: SwitchProps['size'];
}

const LabelSwitch: FC<LabelSwitchProps> = (props) => {
  const { color, size, ...otherProps } = props;
  return (
    <FormControlLabel
      {...otherProps}
      control={
        color === 'success' ? (
          <GreenSwitch size={size || 'medium'} />
        ) : (
          <Switch size={size || 'medium'} />
        )
      }
    />
  );
};

export default LabelSwitch;
