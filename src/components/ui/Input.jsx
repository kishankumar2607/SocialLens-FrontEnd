import React, { forwardRef } from 'react';
import Icon from '../AppIcon';

const Input = forwardRef(({
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  name,
  id,
  variant = 'default',
  icon,
  error,
  helperText,
  disabled = false,
  required = false,
  className = '',
  ...props
}, ref) => {
  // Generate unique ID if not provided
  const inputId = id || `input-${name || Math.random().toString(36).substr(2, 9)}`;
  
  // Determine input container classes based on variant
  const getContainerClasses = () => {
    const baseClasses = 'relative w-full';
    return `${baseClasses} ${className}`;
  };
  
  // Determine input classes based on variant and error state
  const getInputClasses = () => {
    const baseClasses = 'w-full bg-surface-medium border rounded-md px-3 py-2 text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed';
    
    if (error) {
      return `${baseClasses} border-error focus:ring-error`;
    }
    
    if (variant === 'search' || icon) {
      return `${baseClasses} pl-10 border-border-dark focus:ring-primary-light`;
    }
    
    return `${baseClasses} border-border-dark focus:ring-primary-light`;
  };
  
  return (
    <div className={getContainerClasses()}>
      {label && (
        <label 
          htmlFor={inputId} 
          className="block mb-1.5 text-sm font-medium text-text-secondary"
        >
          {label}
          {required && <span className="ml-1 text-error">*</span>}
        </label>
      )}
      
      <div className="relative">
        {(variant === 'search' || icon) && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Icon 
              name={variant === 'search' ? 'Search' : icon} 
              size={18} 
              className="text-text-tertiary" 
            />
          </div>
        )}
        
        <input
          ref={ref}
          type={type}
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={getInputClasses()}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error || helperText ? `${inputId}-helper-text` : undefined}
          {...props}
        />
      </div>
      
      {(error || helperText) && (
        <p 
          id={`${inputId}-helper-text`} 
          className={`mt-1.5 text-sm ${error ? 'text-error' : 'text-text-tertiary'}`}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;