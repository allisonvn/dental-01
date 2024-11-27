import React, { useState } from 'react';
import { 
  Search, 
  Plus,  
  MoreVertical, 
  FileText, 
  Calendar, 
  Tag,
  Phone,
  ChevronLeft,
  ChevronRight,
  Filter,
  Pencil,
  Trash2
} from 'lucide-react';
import {
  Card,
  CardContent,
} from "@/components/ui/card"; 
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from '@tanstack/react-query';
import { usePatients } from '@/hooks/usePatients';
import PatientFilters from '@/components/patients/PatientFilters';
import PatientTable from '@/components/patients/PatientTable'; 
import AddPatientDialog from '@/components/patients/AddPatientDialog';

function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDoctor, setSelectedDoctor] = useState('all');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [addPatientOpen, setAddPatientOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState('create');
  const [selectedPatient, setSelectedPatient] = useState(null);

  const { data: patients, isLoading } = useQuery({
    queryKey: ['patients', searchTerm, selectedStatus, selectedDoctor],
    queryFn: () => usePatients().getPatients(searchTerm, { 
      status: selectedStatus,
      doctor: selectedDoctor 
    })
  });

  // Filtragem de pacientes
  const filteredPatients = patients || [];
  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const paginatedPatients = filteredPatients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleEditPatient = (patient) => {
    setSelectedPatient(patient);
    setDialogMode('edit');
    setAddPatientOpen(true);
  };

  const handleViewPatient = (patient) => {
    setSelectedPatient(patient);
    setDialogMode('view');
    setAddPatientOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2">Carregando pacientes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Cabeçalho e Filtros Principais */}
      <div className="flex justify-between items-center gap-4">
        <h1 className="text-2xl font-semibold text-gray-900">Pacientes</h1>
        <div className="flex items-center gap-3">
          <Dialog open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
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
              <PatientFilters 
                onClose={() => setIsFiltersOpen(false)}
                selectedStatus={selectedStatus}
                onStatusChange={setSelectedStatus}
                selectedDoctor={selectedDoctor}
                onDoctorChange={setSelectedDoctor}
              />
            </DialogContent>
          </Dialog>
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => {
              setSelectedPatient(null);
              setDialogMode('create');
              setAddPatientOpen(true);
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Novo Paciente
          </Button>
        </div>
      </div>

      {/* Barra de Pesquisa e Filtros */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar por nome, CPF ou telefone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-9"
          />
        </div>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-[180px] h-9">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="active">Em tratamento</SelectItem>
            <SelectItem value="pending_return">Aguardando retorno</SelectItem>
            <SelectItem value="completed">Tratamento concluído</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
          <SelectTrigger className="w-[180px] h-9">
            <SelectValue placeholder="Dentista" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="ana">Dra. Ana Santos</SelectItem>
            <SelectItem value="carlos">Dr. Carlos Lima</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tabela de Pacientes */}
      <Card>
        <CardContent className="p-0">
          <PatientTable 
            patients={paginatedPatients}
            onEdit={handleEditPatient}
          />

          {/* Paginação */}
          <div className="flex items-center justify-between px-4 py-3 border-t">
            <div className="flex items-center gap-2">
              <Select 
                value={itemsPerPage.toString()} 
                onValueChange={(value) => setItemsPerPage(Number(value))}
              >
                <SelectTrigger className="w-[70px] h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-gray-500">
                itens por página
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={currentPage === page ? "bg-blue-600" : ""}
                  >
                    {page}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <AddPatientDialog
        open={addPatientOpen}
        onOpenChange={setAddPatientOpen}
        mode={dialogMode}
        patient={selectedPatient}
      />
    </div>
  );
}

export default PatientsPage;