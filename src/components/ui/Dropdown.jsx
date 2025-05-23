import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';

const Dropdown = ({
  variant = 'select',
  label,
  options = [],
  value,
  onChange,
  placeholder = 'Select an option',
  multiple = false,
  disabled = false,
  error,
  helperText,
  className = '',
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(multiple ? (value || []) : value);
  const dropdownRef = useRef(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Update internal state when value prop changes
  useEffect(() => {
    if (multiple) {
      setSelectedOptions(value || []);
    } else {
      setSelectedOptions(value);
    }
  }, [value, multiple]);
  
  // Toggle dropdown
  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };
  
  // Handle option selection
  const handleSelect = (option) => {
    if (multiple) {
      const isSelected = selectedOptions.some(item => item.value === option.value);
      let newSelectedOptions;
      
      if (isSelected) {
        newSelectedOptions = selectedOptions.filter(item => item.value !== option.value);
      } else {
        newSelectedOptions = [...selectedOptions, option];
      }
      
      setSelectedOptions(newSelectedOptions);
      onChange && onChange(newSelectedOptions);
    } else {
      setSelectedOptions(option);
      onChange && onChange(option);
      setIsOpen(false);
    }
  };
  
  // Check if an option is selected
  const isOptionSelected = (option) => {
    if (multiple) {
      return selectedOptions.some(item => item.value === option.value);
    }
    return selectedOptions && selectedOptions.value === option.value;
  };
  
  // Render selected value(s)
  const renderSelectedValue = () => {
    if (!selectedOptions || (multiple && selectedOptions.length === 0)) {
      return <span className="text-text-tertiary">{placeholder}</span>;
    }
    
    if (multiple) {
      if (selectedOptions.length === 1) {
        return <span className="text-text-primary">{selectedOptions[0].label}</span>;
      }
      return <span className="text-text-primary">{selectedOptions.length} items selected</span>;
    }
    
    return <span className="text-text-primary">{selectedOptions.label}</span>;
  };
  
  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {label && (
        <label className="block mb-1.5 text-sm font-medium text-text-secondary">
          {label}
        </label>
      )}
      
      <button
        type="button"
        className={`relative w-full bg-surface-medium border ${error ? 'border-error' : 'border-border-dark'} rounded-md px-3 py-2 text-left cursor-default focus:outline-none focus:ring-2 ${error ? 'focus:ring-error' : 'focus:ring-primary-light'} focus:border-transparent transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed`}
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        disabled={disabled}
        {...props}
      >
        <div className="flex items-center justify-between">
          <div className="truncate">
            {renderSelectedValue()}
          </div>
          <Icon
            name="ChevronDown"
            size={18}
            className={`text-text-tertiary transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
          />
        </div>
      </button>
      
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-surface-dark border border-border-dark rounded-md shadow-lg max-h-60 overflow-auto focus:outline-none animate-fade-in">
          <ul
            className="py-1"
            role="listbox"
            aria-labelledby="dropdown-button"
            aria-multiselectable={multiple}
          >
            {options.map((option) => (
              <li
                key={option.value}
                role="option"
                aria-selected={isOptionSelected(option)}
                className={`px-3 py-2 cursor-pointer flex items-center justify-between ${
                  isOptionSelected(option)
                    ? 'bg-primary/20 text-text-primary' :'text-text-secondary hover:bg-surface-medium'
                }`}
                onClick={() => handleSelect(option)}
              >
                <span className="truncate">{option.label}</span>
                {isOptionSelected(option) && (
                  <Icon name="Check" size={16} className="text-primary" />
                )}
              </li>
            ))}
            
            {options.length === 0 && (
              <li className="px-3 py-2 text-text-tertiary">
                No options available
              </li>
            )}
          </ul>
        </div>
      )}
      
      {(error || helperText) && (
        <p className={`mt-1.5 text-sm ${error ? 'text-error' : 'text-text-tertiary'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
};

export default Dropdown;