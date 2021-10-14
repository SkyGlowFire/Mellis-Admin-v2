import { Checkbox, CheckboxProps } from '@mui/material';
import { green } from '@mui/material/colors';
import { withStyles } from '@mui/styles';
import { FC } from 'react';

const GreenCheckbox = withStyles({
  root: {
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

type Color = 'success' | CheckboxProps['color'];

interface CustomCheckboxProps extends Omit<CheckboxProps, 'color'> {
  color: Color;
}

const CustomCheckbox: FC<CustomCheckboxProps> = ({ color, ...props }) => {
  return color === 'success' ? (
    <GreenCheckbox {...props} />
  ) : (
    <Checkbox {...props} color={color} />
  );
};

export default CustomCheckbox;
