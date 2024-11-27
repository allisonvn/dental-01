import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogFooter } from "@/components/ui/dialog";

const PatientFilters = ({ onClose, selectedStatus, onStatusChange, selectedDoctor, onDoctorChange, dateRange, onDateRangeChange }) => {
  const [localStatus, setLocalStatus] = useState(selectedStatus);
  const [localDoctor, setLocalDoctor] = useState(selectedDoctor);
  const [startDate, setStartDate] = useState(dateRange?.startDate || '');
  const [endDate, setEndDate] = useState(dateRange?.endDate || '');

  const handleApplyFilters = () => {
    onStatusChange(localStatus);
    onDoctorChange(localDoctor);
    onDateRangeChange({ startDate, endDate });
    onClose();
  };

  const handleClearFilters = () => {
    setLocalStatus('all');
    setLocalDoctor('all');
    setStartDate('');
    setEndDate('');
    onStatusChange('all');
    onDoctorChange('all');
    onDateRangeChange({ startDate: '', endDate: '' });
    onClose();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h4 className="font-medium">Status do Tratamento</h4>
        <div className="flex flex-wrap gap-2">
          {[
            { value: 'active', label: 'Em tratamento' },
            { value: 'pending_return', label: 'Aguardando retorno' },
            { value: 'completed', label: 'Concluído' },
            { value: 'cancelled', label: 'Cancelado' }
          ].map((status) => (
            <Button
              key={status.value}
              variant={localStatus === status.value ? "default" : "outline"}
              size="sm"
              className="h-8"
              onClick={() => setLocalStatus(status.value)}
            >
              {status.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="font-medium">Dentista</h4>
        <Select value={localDoctor} onValueChange={setLocalDoctor}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o dentista" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="dra-ana">Dra. Ana Santos</SelectItem>
            <SelectItem value="dr-carlos">Dr. Carlos Lima</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <h4 className="font-medium">Período</h4>
        <div className="flex gap-2">
          <Input
            type="date"
            className="flex-1"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <Input
            type="date"
            className="flex-1"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={handleClearFilters}>
          Limpar
        </Button>
        <Button onClick={handleApplyFilters}>
          Aplicar Filtros
        </Button>
      </DialogFooter>
    </div>
  );
};

export default PatientFilters;