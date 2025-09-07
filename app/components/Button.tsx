// components/ui/Button.tsx
'use client';

import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
};

const Button = ({ children, className, variant = 'primary', ...props }: ButtonProps) => {
  const baseStyle = 'p-2 w-12 h-12 flex justify-center items-center rounded-full text-white font-semibold';
  const variants = {
    primary: 'bg-[#DE595C]/80 rounded-full',
    secondary: 'hover:bg-[#DE595C] rounded-full',
  };

  return (
    <button
      className={baseStyle + ' ' + variants[variant] + ' ' + className}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
