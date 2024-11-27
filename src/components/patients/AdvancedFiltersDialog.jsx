import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const treatmentStatuses = [
  { id: 'in_treatment', label: 'Em tratamento' },
  { id: 'waiting_return', label: 'Aguardando retorno' },
  { id: 'completed', label: 'Concluído' },
  { id: 'cancelled', label: 'Cancelado' }
];

const dentists = [
  { id: 'all', name: 'Todos os dentistas' },
  { id: 'dra-ana', name: 'Dra. Ana Santos' },
  { id: 'dr-carlos', name: 'Dr. Carlos Lima' },
  { id: 'dra-maria', name: 'Dra. Maria Silva' }
];

const defaultFilters = {
  statuses: [],
  dentist: 'all',
  dateRange: { start: '', end: '' }
};

const AdvancedFiltersDialog = ({
  open,
  onOpenChange,
  initialFilters = defaultFilters,
  onApplyFilters
}) => {
  const [filters, setFilters] = useState(defaultFilters);

  useEffect(() => {
    if (open) {
      setFilters(initialFilters);
    }
  }, [open, initialFilters]);

  const handleStatusToggle = (statusId) => {
    setFilters(prev => ({
      ...prev,
      statuses: prev.statuses.includes(statusId)
        ? prev.statuses.filter(id => id !== statusId)
        : [...prev.statuses, statusId]
    }));
  };

  const handleInputChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onOpenChange(false);
  };

  const handleClear = () => {
    const clearedFilters = defaultFilters;
    setFilters(clearedFilters);
    onApplyFilters(clearedFilters);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Filtros Avançados</DialogTitle>
          <DialogDescription>
            Refine sua busca usando múltiplos critérios
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Status do Tratamento */}
          <div className="space-y-4">
            <Label className="text-base">Status do Tratamento</Label>
            <div className="grid grid-cols-2 gap-4">
              {treatmentStatuses.map((status) => (
                <div key={status.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={status.id}
                    checked={filters.statuses.includes(status.id)}
                    onChange={() => handleStatusToggle(status.id)}
                  />
                  <Label htmlFor={status.id} className="text-sm font-normal">
                    {status.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Dentista */}
          <div className="space-y-2">
            <Label className="text-base">Dentista</Label>
            <Select 
              value={filters.dentist} 
              onValueChange={(value) => handleInputChange('dentist', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o dentista" />
              </SelectTrigger>
              <SelectContent>
                {dentists.map(dentist => (
                  <SelectItem key={dentist.id} value={dentist.id}>
                    {dentist.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Período */}
          <div className="space-y-4">
            <Label className="text-base">Período</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm">Data inicial</Label>
                <Input
                  type="date"
                  value={filters.dateRange.start}
                  onChange={(e) => handleInputChange('dateRange', { 
                    ...filters.dateRange, 
                    start: e.target.value 
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Data final</Label>
                <Input
                  type="date"
                  value={filters.dateRange.end}
                  onChange={(e) => handleInputChange('dateRange', { 
                    ...filters.dateRange, 
                    end: e.target.value 
                  })}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={handleClear}>
            Limpar Filtros
          </Button>
          <Button onClick={handleApply}>
            Aplicar Filtros
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdvancedFiltersDialog;