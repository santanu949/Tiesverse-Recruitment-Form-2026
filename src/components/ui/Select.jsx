import React, { forwardRef } from 'react';

export const Select = forwardRef(({ label, options, error, className = '', ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1.5 w-full text-left">
      {label && (
        <label className="text-sm font-semibold text-textMain tracking-tight">
          {label}
        </label>
      )}
      <select
        ref={ref}
        className={`w-full bg-inputBg border-2 ${
          error 
            ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' 
            : 'border-borderLight focus:border-primary focus:ring-primary/20 focus:ring-4 hover:border-gray-400'
        } rounded-xl px-4 py-3 text-textMain font-medium outline-none transition-all duration-200 appearance-none cursor-pointer shadow-input ${className}`}
        {...props}
      >
        <option value="" disabled className="text-textMuted font-normal">Please select one</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="font-medium text-textMain">
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <span className="text-xs text-red-600 mt-0.5 font-bold">
          {error.message || error}
        </span>
      )}
    </div>
  );
});

Select.displayName = 'Select';