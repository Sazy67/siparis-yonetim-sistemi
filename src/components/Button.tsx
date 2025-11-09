import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
}

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}: ButtonProps) => {
  const baseClasses = 'px-5 py-2.5 rounded-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500'
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
