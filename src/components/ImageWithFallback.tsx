import { useState } from 'react';
import { Layers } from 'lucide-react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fallbackTitle: string;
  className?: string;
  aspectClassName?: string;
}

export function ImageWithFallback({
  src,
  alt,
  fallbackTitle,
  className = '',
  aspectClassName = 'aspect-[4/3]',
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#EDE9FE] via-[#E0E7FF] to-[#FCE7F3] dark:from-[#1E1B4B] dark:via-[#172554] dark:to-[#3B0764] p-6 text-center ${aspectClassName} ${className}`}
      >
        <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white/80 text-[#5B21B6] shadow-sm dark:bg-white/10 dark:text-[#C4B5FD]">
          <Layers className="h-5 w-5" aria-hidden="true" />
        </div>
        <p className="font-display text-sm font-semibold text-[#1E1B4B] dark:text-slate-100">
          {fallbackTitle}
        </p>
        <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">Visual Preview</p>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden bg-[#F3EFFE] dark:bg-[#16192B] ${aspectClassName} ${className}`}
    >
      {!isLoaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-[#EDE9FE] via-[#EEF2FF] to-[#FDF2F8] dark:from-[#1A1D35] dark:via-[#161A2E] dark:to-[#231936]"
        />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`h-full w-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}
