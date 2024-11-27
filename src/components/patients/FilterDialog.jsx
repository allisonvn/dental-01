import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Filter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const FilterDialog = ({ isOpen, onOpenChange, onApplyFilters }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="h-9">
          <Filter className="h-4 w-4 mr-2" />
          Filtros
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filtros Avançados</DialogTitle>
          <DialogDescription>
            Refine sua busca usando múltiplos critérios
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <h4 className="font-medium">Status do Tratamento</h4>
            <div className="flex flex-wrap gap-2">
              {['Em tratamento', 'Aguardando retorno', 'Concluído', 'Cancelado'].map((status) => (
                <Button
                  key={status}
                  variant="outline"
                  size="sm"
                  className="h-8"
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Dentista</h4>
            <Select>
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
              <Input type="date" className="flex-1" />
              <Input type="date" className="flex-1" />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline">Limpar</Button>
          <Button onClick={onApplyFilters}>Aplicar Filtros</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FilterDialog;