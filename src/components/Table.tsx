import type { ReactNode } from 'react';

interface TableProps {
  children: ReactNode;
  className?: string;
}

export const Table = ({ children, className = '' }: TableProps) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className={`min-w-full bg-white ${className}`}>
        {children}
      </table>
    </div>
  );
};

interface TableHeaderProps {
  children: ReactNode;
}

export const TableHeader = ({ children }: TableHeaderProps) => {
  return (
    <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
      {children}
    </thead>
  );
};

interface TableBodyProps {
  children: ReactNode;
}

export const TableBody = ({ children }: TableBodyProps) => {
  return <tbody>{children}</tbody>;
};

interface TableRowProps {
  children: ReactNode;
  className?: string;
}

export const TableRow = ({ children, className = '' }: TableRowProps) => {
  return (
    <tr className={`border-b border-gray-200 hover:bg-blue-50 transition ${className}`}>
      {children}
    </tr>
  );
};

interface TableCellProps {
  children: ReactNode;
  className?: string;
  isHeader?: boolean;
}

export const TableCell = ({ children, className = '', isHeader = false }: TableCellProps) => {
  const Tag = isHeader ? 'th' : 'td';
  const baseClasses = 'px-6 py-4 text-left';
  const headerClasses = isHeader ? 'font-bold text-gray-700 text-sm uppercase tracking-wider' : 'text-gray-700';
  
  return (
    <Tag className={`${baseClasses} ${headerClasses} ${className}`}>
      {children}
    </Tag>
  );
};
