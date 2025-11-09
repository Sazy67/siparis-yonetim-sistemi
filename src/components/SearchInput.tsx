import { useState, useEffect, type InputHTMLAttributes } from 'react';

interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  onSearch: (query: string) => void;
  debounceMs?: number;
}

const SearchInput = ({ 
  label, 
  onSearch, 
  debounceMs = 300, 
  className = '', 
  ...props 
}: SearchInputProps) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(value);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [value, debounceMs, onSearch]);

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        {...props}
      />
    </div>
  );
};

export default SearchInput;
