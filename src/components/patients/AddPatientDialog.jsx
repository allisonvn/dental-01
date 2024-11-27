import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddPatientPage from '@/pages/patients/AddPatient';

const AddPatientDialog = ({ open, onOpenChange, mode = 'create', patient = null }) => {
  const titles = {
    create: 'Novo Paciente',
    edit: 'Editar Paciente',
    view: 'Detalhes do Paciente'
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{titles[mode]}</DialogTitle>
        </DialogHeader>
        <AddPatientPage mode={mode} patient={patient} onClose={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default AddPatientDialog;