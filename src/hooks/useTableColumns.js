import { useState } from 'react';

const defaultColumns = [
  { id: 'photo', label: 'Foto', isVisible: true },
  { id: 'name', label: 'Nome', isVisible: true },
  { id: 'email', label: 'Email', isVisible: true },
  { id: 'phone', label: 'Telefone', isVisible: true },
  { id: 'status', label: 'Status', isVisible: true },
  { id: 'appointments', label: 'Total de Consultas', isVisible: true },
  { id: 'totalSpent', label: 'Total Gasto', isVisible: true },
  { id: 'actions', label: 'Ações', isVisible: true },
];

export const useTableColumns = () => {
  const [columns, setColumns] = useState(defaultColumns);

  const toggleColumn = (columnId, isVisible) => {
    setColumns(prevColumns =>
      prevColumns.map(column =>
        column.id === columnId ? { ...column, isVisible } : column
      )
    );
  };

  const resetColumns = () => {
    setColumns(defaultColumns);
  };

  const getVisibleColumns = () => {
    return columns.filter(column => column.isVisible);
  };

  return {
    columns,
    toggleColumn,
    resetColumns,
    getVisibleColumns,
  };
};