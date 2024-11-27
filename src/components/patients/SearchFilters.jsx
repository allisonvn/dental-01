import React from 'react';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SearchFilters = ({
  searchTerm,
  onSearchChange,
  selectedStatus,
  onStatusChange,
  selectedDentist,
  onDentistChange
}) => {
  return (
    <div className="flex items-center gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Buscar por nome, CPF ou telefone..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 h-9"
        />
      </div>
      <Select value={selectedStatus} onValueChange={onStatusChange}>
        <SelectTrigger className="w-[180px] h-9">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="in_treatment">Em tratamento</SelectItem>
          <SelectItem value="waiting_return">Aguardando retorno</SelectItem>
          <SelectItem value="completed">Tratamento concluído</SelectItem>
          <SelectItem value="cancelled">Cancelado</SelectItem>
        </SelectContent>
      </Select>
      <Select value={selectedDentist} onValueChange={onDentistChange}>
        <SelectTrigger className="w-[180px] h-9">
          <SelectValue placeholder="Dentista" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="dra-ana">Dra. Ana Santos</SelectItem>
          <SelectItem value="dr-carlos">Dr. Carlos Lima</SelectItem>
          <SelectItem value="dra-maria">Dra. Maria Silva</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SearchFilters;