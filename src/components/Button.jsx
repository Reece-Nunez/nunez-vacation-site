import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';

const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  onClick,
  className = '',
  ariaLabel,
  ariaDescribedBy,
  role = 'button',
  type = 'button',
  ...props
}, ref) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transform hover:scale-105 active:scale-95';
  
  const variants = {
    primary: 'bg-primary-700 text-white hover:bg-primary-600 focus:ring-primary-700 shadow-soft hover:shadow-large',
    secondary: 'bg-accent-400 text-white hover:bg-accent-500 focus:ring-accent-400 shadow-soft hover:shadow-large',
    outline: 'border-2 border-primary-700 text-primary-700 bg-transparent hover:bg-primary-700 hover:text-white focus:ring-primary-700',
    ghost: 'text-primary-700 bg-transparent hover:bg-primary-50 focus:ring-primary-700',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600 shadow-soft hover:shadow-large'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl'
  };

  const widthClass = fullWidth ? 'w-full' : '';

  const buttonClasses = `
    ${baseClasses}
    ${variants[variant]}
    ${sizes[size]}
    ${widthClass}
    ${className}
  `.trim();

  const LoadingSpinner = () => (
    <motion.svg
      className="w-4 h-4 mr-2"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </motion.svg>
  );

  return (
    <motion.button
      ref={ref}
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
      role={role}
      aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
      aria-describedby={ariaDescribedBy}
      aria-disabled={disabled || loading}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      {...props}
    >
      {loading && <LoadingSpinner />}
      {!loading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      
      <span className={loading ? 'opacity-70' : ''}>
        {loading ? 'Loading...' : children}
      </span>
      
      {!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </motion.button>
  );
});

Button.displayName = 'Button';

export default Button;