import React from 'react';
import { 
  ChevronRight, 
  Upload, 
  Image, 
  Plus, 
  Camera, 
  UserCircle, 
  FileText, 
  AlertCircle,
  Phone,
  Mail,
  Calendar,
  Home,
  CreditCard,
  Heart
} from 'lucide-react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";

function AddPatientPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-blue-600 hover:text-blue-700 cursor-pointer">Clínica</span>
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <span className="text-blue-600 hover:text-blue-700 cursor-pointer">Pacientes</span>
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <span className="text-gray-500">Novo Paciente</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Cadastro de Novo Paciente</h1>
          <div className="flex gap-3">
            <Button variant="outline" className="font-medium">
              Cancelar
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 font-medium">
              Salvar Paciente
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="col-span-2 space-y-6">
            {/* Personal Info */}
            <Card className="shadow-sm border-gray-200">
              <CardHeader className="pb-4 border-b">
                <div className="flex items-center gap-2">
                  <UserCircle className="h-5 w-5 text-blue-600" />
                  <h2 className="text-lg font-medium">Informações Pessoais</h2>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid gap-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Nome</label>
                      <Input placeholder="Digite o nome" className="h-10" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Sobrenome</label>
                      <Input placeholder="Digite o sobrenome" className="h-10" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">CPF</label>
                      <div className="relative">
                        <Input placeholder="000.000.000-00" className="h-10 pl-10" />
                        <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">RG</label>
                      <div className="relative">
                        <Input placeholder="00.000.000-0" className="h-10 pl-10" />
                        <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Email</label>
                      <div className="relative">
                        <Input type="email" placeholder="exemplo@email.com" className="h-10 pl-10" />
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Telefone</label>
                      <div className="relative">
                        <Input placeholder="(00) 00000-0000" className="h-10 pl-10" />
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Data de Nascimento</label>
                      <div className="relative">
                        <Input type="date" className="h-10 pl-10" />
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Profissão</label>
                      <Input placeholder="Digite a profissão" className="h-10" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Endereço</label>
                    <div className="relative">
                      <Textarea 
                        placeholder="Rua, número, complemento, bairro, cidade e CEP" 
                        className="min-h-[80px] pl-10"
                      />
                      <Home className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Treatment Info */}
            <Card className="shadow-sm border-gray-200">
              <CardHeader className="pb-4 border-b">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                  <h2 className="text-lg font-medium">Informações do Tratamento</h2>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid gap-6">
                  {/* Dentist and Specialty */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Dentista Responsável</label>
                      <Select>
                        <SelectTrigger className="h-10">
                          <SelectValue placeholder="Selecione o dentista" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dra-ana">Dra. Ana Silva - Ortodontia</SelectItem>
                          <SelectItem value="dr-carlos">Dr. Carlos Santos - Implantodontia</SelectItem>
                          <SelectItem value="dra-maria">Dra. Maria Oliveira - Endodontia</SelectItem>
                          <SelectItem value="dr-joao">Dr. João Paulo - Clínico Geral</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Especialidade Principal</label>
                      <Select>
                        <SelectTrigger className="h-10">
                          <SelectValue placeholder="Selecione a especialidade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ortodontia">Ortodontia</SelectItem>
                          <SelectItem value="implantodontia">Implantodontia</SelectItem>
                          <SelectItem value="endodontia">Endodontia</SelectItem>
                          <SelectItem value="clinico">Clínico Geral</SelectItem>
                          <SelectItem value="protese">Prótese</SelectItem>
                          <SelectItem value="pediatria">Odontopediatria</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Treatment Type and Status */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Tipo de Tratamento</label>
                      <Select>
                        <SelectTrigger className="h-10">
                          <SelectValue placeholder="Selecione o tratamento" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="aparelho">Aparelho Ortodôntico</SelectItem>
                          <SelectItem value="implante">Implante Dentário</SelectItem>
                          <SelectItem value="canal">Tratamento de Canal</SelectItem>
                          <SelectItem value="limpeza">Limpeza e Profilaxia</SelectItem>
                          <SelectItem value="protese">Prótese Dentária</SelectItem>
                          <SelectItem value="restauracao">Restauração</SelectItem>
                          <SelectItem value="cirurgia">Cirurgia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Status do Tratamento</label>
                      <Select>
                        <SelectTrigger className="h-10">
                          <SelectValue placeholder="Selecione o status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="avaliacao">Em Avaliação</SelectItem>
                          <SelectItem value="aguardando">Aguardando Início</SelectItem>
                          <SelectItem value="em_andamento">Em Andamento</SelectItem>
                          <SelectItem value="finalizado">Finalizado</SelectItem>
                          <SelectItem value="suspenso">Suspenso</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Insurance */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Convênio</label>
                      <Select>
                        <SelectTrigger className="h-10">
                          <SelectValue placeholder="Selecione o convênio" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="particular">Particular</SelectItem>
                          <SelectItem value="amil">Amil Dental</SelectItem>
                          <SelectItem value="odontoprev">OdontoPrev</SelectItem>
                          <SelectItem value="sulamerica">SulAmérica Odonto</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Número da Carteirinha</label>
                      <Input placeholder="Digite o número" className="h-10" />
                    </div>
                  </div>

                  {/* Treatment Notes */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Observações do Tratamento</label>
                    <Textarea 
                      placeholder="Detalhes importantes sobre o tratamento, procedimentos planejados, etc."
                      className="min-h-[80px]"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Medical History */}
            <Card className="shadow-sm border-gray-200">
              <CardHeader className="pb-4 border-b">
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-blue-600" />
                  <h2 className="text-lg font-medium">Histórico Médico</h2>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <Alert className="bg-blue-50 text-blue-800 border border-blue-200">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Preencha corretamente o histórico médico para garantir um tratamento seguro.
                    </AlertDescription>
                  </Alert>

                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <label className="flex items-center gap-2 p-2 rounded hover:bg-gray-50">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span>Diabetes</span>
                    </label>
                    <label className="flex items-center gap-2 p-2 rounded hover:bg-gray-50">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span>Hipertensão</span>
                    </label>
                    <label className="flex items-center gap-2 p-2 rounded hover:bg-gray-50">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span>Problemas Cardíacos</span>
                    </label>
                    <label className="flex items-center gap-2 p-2 rounded hover:bg-gray-50">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span>Alergia a Medicamentos</span>
                    </label>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Observações Médicas</label>
                    <Textarea 
                      placeholder="Informações adicionais sobre a saúde do paciente"
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Photo */}
            <Card className="shadow-sm border-gray-200">
              <CardHeader className="pb-4 border-b">
                <div className="flex items-center gap-2">
                  <Camera className="h-5 w-5 text-blue-600" />
                  <h2 className="text-lg font-medium">Foto do Perfil</h2>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm font-medium text-gray-600">Arraste uma foto ou clique aqui</p>
                  <p className="text-xs text-gray-500 mt-1">PNG ou JPG até 5MB</p>
                </div>
              </CardContent>
            </Card>

            {/* Documentation */}
            <Card className="shadow-sm border-gray-200">
              <CardHeader className="pb-4 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image className="h-5 w-5 text-blue-600" />
                    <h2 className="text-lg font-medium">Documentação</h2>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Adicionar Documentação</DialogTitle>
                        <DialogDescription>
                          Faça upload de radiografias, exames ou outros documentos relevantes.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Tipo de Documento</label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o tipo" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="radiografia">Radiografia</SelectItem>
                              <SelectItem value="exame">Exame</SelectItem>
                              <SelectItem value="documento">Documento</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center">
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm">Clique para fazer upload</p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="text-sm text-gray-500 text-center py-8">
                    Nenhum documento adicionado
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPatientPage;