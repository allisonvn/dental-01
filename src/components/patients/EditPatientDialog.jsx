import React from 'react';
import NewPatientDialog from './NewPatientDialog';

const EditPatientDialog = ({ open, onOpenChange, patient }) => {
  return (
    <NewPatientDialog 
      open={open} 
      onOpenChange={onOpenChange} 
      mode="edit" 
      patient={patient} 
    />
  );
};

export default EditPatientDialog;