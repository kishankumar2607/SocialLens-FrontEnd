import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({
  variant = 'standard',
  title,
  subtitle,
  children,
  footer,
  onClick,
  to,
  className = '',
  headerClassName = '',
  bodyClassName = '',
  footerClassName = '',
  ...props
}) => {
  // Base classes for all card variants
  const baseClasses = 'rounded-lg transition-all duration-200';
  
  // Variant-specific classes
  const variantClasses = {
    standard: 'bg-surface-dark border border-border-dark',
    metric: 'bg-surface-dark border border-border-dark',
    interactive: 'bg-surface-dark border border-border-dark hover:scale-[1.02] hover:border-primary-light cursor-pointer',
    glassmorphic: 'bg-surface-dark/70 backdrop-blur-md border border-border-dark/50',
    gradient: 'bg-surface-dark border-2 border-transparent bg-clip-padding relative before:absolute before:inset-0 before:-z-10 before:rounded-lg before:p-[2px] before:bg-gradient-to-r before:from-neon-blue before:to-neon-purple',
  };
  
  // Combine all classes
  const cardClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;
  
  // Create card content
  const cardContent = (
    <>
      {(title || subtitle) && (
        <div className={`p-4 border-b border-border-dark ${headerClassName}`}>
          {title && (
            <h3 className="text-xl font-display font-semibold text-text-primary">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="mt-1 text-sm text-text-secondary">
              {subtitle}
            </p>
          )}
        </div>
      )}
      
      <div className={`p-4 ${bodyClassName}`}>
        {children}
      </div>
      
      {footer && (
        <div className={`p-4 border-t border-border-dark ${footerClassName}`}>
          {footer}
        </div>
      )}
    </>
  );
  
  // Render card based on interaction type
  if (to) {
    return (
      <Link to={to} className={cardClasses} {...props}>
        {cardContent}
      </Link>
    );
  }
  
  if (onClick) {
    return (
      <div className={cardClasses} onClick={onClick} role="button" tabIndex={0} {...props}>
        {cardContent}
      </div>
    );
  }
  
  return (
    <div className={cardClasses} {...props}>
      {cardContent}
    </div>
  );
};

export default Card;