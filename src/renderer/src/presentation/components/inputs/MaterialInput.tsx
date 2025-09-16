import TextField, { type TextFieldProps } from '@mui/material/TextField';

export const MaterialInput = ({
  variant = 'filled',
  size = 'small',
  type = 'text',
  ...props
}: TextFieldProps) => {
  return <TextField {...props} type={type} variant={variant} size={size} />;
};
