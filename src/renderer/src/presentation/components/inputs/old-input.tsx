// import { type ForwardRefExoticComponent, type RefAttributes } from 'react';
// import { Input, type InputProps } from '@heroui/react';
// import type { LucideProps } from 'lucide-react';
// import clsx from 'clsx';

// interface Props extends InputProps {
//   StartIcon?: ForwardRefExoticComponent<
//     Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
//   >;
//   startIconClass?: string;
//   finalIconClass?: string;
//   errors?: string;
// }

// export const BasicInput = ({
//   StartIcon,
//   color = 'default',
//   variant = 'faded',
//   radius = 'sm',
//   errors,
//   ...props
// }: Props) => {
//   return (
//     <Input
//       {...props}
//       color={!!errors ? 'danger' : color}
//       variant={variant}
//       radius={radius}
//       startContent={
//         StartIcon && (
//           <StartIcon
//             className={clsx('', {
//               'text-default': !errors,
//               'text-danger': !!errors,
//             })}
//           />
//         )
//       }
//       errorMessage={errors}
//       isInvalid={!!errors}
//       autoComplete='off'
//     />
//   );
// };
