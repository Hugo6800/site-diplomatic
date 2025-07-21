// components/ui/Button.tsx
'use client';

import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
};

const Button = ({ children, className, variant = 'primary', ...props }: ButtonProps) => {
  const baseStyle = 'px-4 py-2 rounded text-white font-semibold';
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700',
    secondary: 'bg-gray-600 hover:bg-gray-700',
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
