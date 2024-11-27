import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const ColumnToggleDialog = ({ open, onOpenChange, columns, onColumnToggle }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Colunas Visíveis</DialogTitle>
          <DialogDescription>
            Selecione as colunas que deseja exibir na tabela
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {columns.map((column) => (
            <div key={column.id} className="flex items-center space-x-2">
              <Checkbox
                id={column.id}
                checked={column.isVisible}
                onCheckedChange={(checked) => onColumnToggle(column.id, checked)}
              />
              <Label htmlFor={column.id} className="text-sm font-normal">
                {column.label}
              </Label>
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <Button onClick={() => onOpenChange(false)}>Fechar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ColumnToggleDialog;