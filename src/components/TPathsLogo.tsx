import React, { useState } from 'react';
import { siteData } from '../data';

interface TPathsLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  alt?: string;
}

export const TPathsLogo: React.FC<TPathsLogoProps> = ({
  className = '',
  size = 'md',
  alt = 'TPATHS LEARNING LOGO'
}) => {
  const [hasError, setHasError] = useState(false);

  const sizeClasses = {
    sm: 'h-8 max-h-8',
    md: 'h-10 sm:h-11 max-h-11',
    lg: 'h-14 sm:h-16 max-h-16',
    xl: 'h-20 sm:h-24 max-h-24'
  };

  // Fallback Option: If the logo fails to load, display "TPATHS LEARNING" text placeholder
  if (hasError || !siteData.brand.logo) {
    return (
      <div className={`inline-flex items-center font-black tracking-tight text-[#0066cc] bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200 text-sm sm:text-base ${className}`}>
        TPATHS LEARNING
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center justify-center flex-shrink-0 ${className}`}>
      <img
        src={siteData.brand.logo}
        alt={alt}
        onError={() => setHasError(true)}
        className={`${sizeClasses[size]} w-auto object-contain rounded-xl transition-all duration-200 hover:opacity-95`}
        loading="eager"
      />
    </div>
  );
};

