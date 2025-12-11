import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  fullWidth = false,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-brand-primary to-brand-accent hover:from-indigo-400 hover:to-violet-400 text-white shadow-lg shadow-indigo-500/30 border border-transparent",
    secondary: "bg-brand-secondary hover:bg-cyan-400 text-slate-900 font-bold shadow-lg shadow-cyan-500/30 border border-transparent",
    // Updated outline: Dark text in light mode (text-slate-700), Light text in dark mode (dark:text-slate-300)
    outline: "border border-slate-300 dark:border-slate-600 hover:border-brand-primary text-slate-700 dark:text-slate-300 hover:text-brand-primary dark:hover:text-white bg-transparent",
    ghost: "text-slate-500 dark:text-slate-400 hover:text-brand-primary dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-8 py-3.5 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};