import { FC } from 'react';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { withStyles } from '@mui/styles';

const GreenSwitch = withStyles((theme) => ({
  switchBase: {
    color: theme.palette.success.main,
    '& + $track': {
      backgroundColor: theme.palette.secondary.main,
    },
    '&$checked': {
      color: theme.palette.success.main,
    },
    '&$checked + $track': {
      backgroundColor: theme.palette.success.main,
    },
  },
  checked: {},
  track: {},
}))(Switch);

const CustomSwitch: FC<SwitchProps> = (props) => {
  switch (props.color) {
    case 'success':
      return <GreenSwitch {...props} />;
    default:
      return <Switch {...props} />;
  }
};

export default CustomSwitch;
