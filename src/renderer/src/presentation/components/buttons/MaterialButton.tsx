import Button, { type ButtonProps } from '@mui/material/Button';

export const MaterialButton = ({
  children,
  variant = 'contained',
  type = 'button',
  ...props
}: ButtonProps) => {
  return (
    <Button {...props} variant={variant} type={type}>
      {children}
    </Button>
  );
};
