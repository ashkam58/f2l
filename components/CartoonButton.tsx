import React from 'react';

interface CartoonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  children: React.ReactNode;
}

export const CartoonButton: React.FC<CartoonButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '',
  ...props 
}) => {
  let bgColors = '';
  
  switch(variant) {
    case 'primary':
      bgColors = 'bg-cube-blue text-white hover:bg-blue-500';
      break;
    case 'secondary':
      bgColors = 'bg-white text-black hover:bg-gray-100';
      break;
    case 'danger':
      bgColors = 'bg-cube-red text-white hover:bg-red-600';
      break;
  }

  return (
    <button
      className={`
        ${bgColors}
        border-4 border-black 
        font-bold text-lg px-6 py-3 rounded-xl
        shadow-cartoon hover:shadow-cartoon-active hover:translate-x-[2px] hover:translate-y-[2px]
        transition-all duration-150 active:shadow-none active:translate-x-[4px] active:translate-y-[4px]
        uppercase tracking-wide w-full md:w-auto
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};