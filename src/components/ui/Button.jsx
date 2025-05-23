import React from 'react';
import Icon from '../AppIcon';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  disabled = false,
  fullWidth = false,
  className = '',
  onClick,
  type = 'button',
  ...props
}) => {
  // Base classes
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2 focus:ring-offset-background-dark disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100';
  
  // Size classes
  const sizeClasses = {
    sm: 'text-sm px-3 py-1.5 rounded',
    md: 'text-base px-4 py-2 rounded-md',
    lg: 'text-lg px-5 py-2.5 rounded-md',
  };
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-gradient-to-r from-primary to-primary-hover text-white hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-glow-sm',
    secondary: 'bg-transparent border border-primary text-white hover:bg-primary/10 hover:scale-[1.02] active:scale-[0.98]',
    tertiary: 'bg-transparent text-white hover:bg-surface-medium hover:scale-[1.02] active:scale-[0.98]',
    icon: 'p-2 rounded-full bg-surface-medium text-white hover:bg-surface-medium/80 hover:scale-[1.05]',
  };
  
  // Width classes
  const widthClasses = fullWidth ? 'w-full' : '';
  
  // Combine all classes
  const buttonClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClasses} ${className}`;
  
  // Icon-only button
  if (variant === 'icon') {
    return (
      <button
        type={type}
        className={buttonClasses}
        disabled={disabled}
        onClick={onClick}
        {...props}
      >
        {icon && <Icon name={icon} size={size === 'lg' ? 24 : size === 'md' ? 20 : 16} />}
      </button>
    );
  }
  
  // Button with icon and text
  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <Icon name={icon} className={`${children ? 'mr-2' : ''}`} size={size === 'lg' ? 20 : size === 'md' ? 18 : 16} />
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <Icon name={icon} className={`${children ? 'ml-2' : ''}`} size={size === 'lg' ? 20 : size === 'md' ? 18 : 16} />
      )}
    </button>
  );
};

export default Button;