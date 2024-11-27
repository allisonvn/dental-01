import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  AlertCircle,
  FileText,
  User
} from 'lucide-react';

const PatientDetailsDialog = ({ patient, open, onOpenChange }) => {
  if (!patient) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Ficha do Paciente</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header com informações básicas */}
          <div className="flex items-start gap-4">
            {patient.photoUrl ? (
              <img
                src={patient.photoUrl}
                alt={patient.name}
                className="w-24 h-24 rounded-lg object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-lg bg-gray-100 flex items-center justify-center">
                <User className="w-12 h-12 text-gray-400" />
              </div>
            )}
            <div>
              <h2 className="text-2xl font-bold">{patient.name}</h2>
              <p className="text-gray-500">CPF: {patient.cpf}</p>
              <div className="mt-2 flex gap-2">
                <span className={`px-2 py-1 rounded-full text-sm ${
                  patient.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {patient.status === 'active' ? 'Em tratamento' : 'Aguardando retorno'}
                </span>
              </div>
            </div>
          </div>

          {/* Informações de Contato */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Contato
              </h3>
              <p>{patient.phone}</p>
              <p>{patient.email}</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Endereço
              </h3>
              <p>{patient.address?.street}, {patient.address?.number}</p>
              <p>{patient.address?.city} - {patient.address?.state}</p>
            </div>
          </div>

          {/* Histórico e Agendamentos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Última Visita
              </h3>
              <p>{patient.lastVisit ? format(new Date(patient.lastVisit), 'dd/MM/yyyy', { locale: ptBR }) : 'Sem visitas'}</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Próximo Agendamento
              </h3>
              <p>{patient.nextAppointment ? format(new Date(patient.nextAppointment), 'dd/MM/yyyy', { locale: ptBR }) : 'Sem agendamentos'}</p>
            </div>
          </div>

          {/* Informações Médicas */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Informações Médicas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium">Alergias</h4>
                <p className="text-gray-600">{patient.healthInfo?.allergies || 'Nenhuma alergia registrada'}</p>
              </div>
              <div>
                <h4 className="font-medium">Medicamentos</h4>
                <p className="text-gray-600">{patient.healthInfo?.medications || 'Nenhum medicamento registrado'}</p>
              </div>
            </div>
          </div>

          {/* Histórico de Tratamentos */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Histórico de Tratamentos
            </h3>
            <div className="border rounded-lg divide-y">
              {patient.treatments?.map((treatment, index) => (
                <div key={index} className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{treatment.procedure}</h4>
                      <p className="text-sm text-gray-500">
                        {format(new Date(treatment.date), 'dd/MM/yyyy', { locale: ptBR })}
                      </p>
                    </div>
                    <span className="text-sm text-gray-500">
                      Dr. {treatment.dentist}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{treatment.notes}</p>
                </div>
              ))}
              {(!patient.treatments || patient.treatments.length === 0) && (
                <p className="p-4 text-gray-500">Nenhum tratamento registrado</p>
              )}
            </div>
          </div>

          {/* Ações */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Fechar
            </Button>
            <Button>
              Editar Informações
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PatientDetailsDialog;