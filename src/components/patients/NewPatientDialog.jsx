import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePatients } from '@/hooks/usePatients';
import { toast } from 'react-hot-toast';
import { Upload } from 'lucide-react';

const patientSchema = z.object({
  personalInfo: z.object({
    firstName: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
    lastName: z.string().min(2, 'Sobrenome deve ter no mínimo 2 caracteres'),
    email: z.string().email('E-mail inválido'),
    phone: z.string().min(10, 'Telefone inválido'),
    birthDate: z.string(),
    age: z.string(),
    gender: z.string(),
    weight: z.string(),
    height: z.string(),
    maritalStatus: z.string(),
    address: z.string(),
  }),
  medicalInfo: z.object({
    bloodGroup: z.string(),
    bloodPressure: z.string(),
    sugarLevel: z.string(),
    condition: z.string(),
    allergies: z.string().optional(),
    medications: z.string().optional(),
    medicalHistory: z.string().optional(),
  }),
});

const NewPatientDialog = ({ open, onOpenChange }) => {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [medicalFiles, setMedicalFiles] = useState([]);
  const { addPatient } = usePatients();
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      personalInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        birthDate: '',
        age: '',
        gender: '',
        weight: '',
        height: '',
        maritalStatus: '',
        address: '',
      },
      medicalInfo: {
        bloodGroup: '',
        bloodPressure: '',
        sugarLevel: '',
        condition: '',
        allergies: '',
        medications: '',
        medicalHistory: '',
      },
    },
  });

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
    }
  };

  const handleMedicalFilesChange = (e) => {
    const files = Array.from(e.target.files);
    setMedicalFiles(prev => [...prev, ...files]);
  };

  const onSubmit = async (data) => {
    try {
      const patientData = {
        ...data.personalInfo,
        ...data.medicalInfo,
        fullName: `${data.personalInfo.firstName} ${data.personalInfo.lastName}`,
        status: 'active',
        createdAt: new Date().toISOString(),
      };

      await addPatient(patientData, profilePhoto);
      toast.success('Paciente cadastrado com sucesso!');
      reset();
      setProfilePhoto(null);
      setMedicalFiles([]);
      onOpenChange(false);
    } catch (error) {
      console.error('Erro ao cadastrar paciente:', error);
      toast.error('Erro ao cadastrar paciente');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Paciente</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Informações Básicas */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Informações Básicas</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">Nome</Label>
                  <Input {...register('personalInfo.firstName')} />
                  {errors.personalInfo?.firstName && (
                    <p className="text-sm text-red-500">{errors.personalInfo.firstName.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="lastName">Sobrenome</Label>
                  <Input {...register('personalInfo.lastName')} />
                  {errors.personalInfo?.lastName && (
                    <p className="text-sm text-red-500">{errors.personalInfo.lastName.message}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input {...register('personalInfo.email')} type="email" />
                {errors.personalInfo?.email && (
                  <p className="text-sm text-red-500">{errors.personalInfo.email.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="phone">Telefone</Label>
                <Input {...register('personalInfo.phone')} />
                {errors.personalInfo?.phone && (
                  <p className="text-sm text-red-500">{errors.personalInfo.phone.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="birthDate">Data de Nascimento</Label>
                  <Input {...register('personalInfo.birthDate')} type="date" />
                </div>

                <div>
                  <Label htmlFor="age">Idade</Label>
                  <Input {...register('personalInfo.age')} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="gender">Gênero</Label>
                  <Select onValueChange={(value) => register('personalInfo.gender').onChange({ target: { value } })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Masculino</SelectItem>
                      <SelectItem value="female">Feminino</SelectItem>
                      <SelectItem value="other">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="maritalStatus">Estado Civil</Label>
                  <Select onValueChange={(value) => register('personalInfo.maritalStatus').onChange({ target: { value } })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Solteiro(a)</SelectItem>
                      <SelectItem value="married">Casado(a)</SelectItem>
                      <SelectItem value="divorced">Divorciado(a)</SelectItem>
                      <SelectItem value="widowed">Viúvo(a)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="address">Endereço Completo</Label>
                <Textarea {...register('personalInfo.address')} />
              </div>
            </div>

            {/* Foto e Informações Médicas */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Foto do Perfil</h3>
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePhotoChange}
                    className="hidden"
                    id="profilePhoto"
                  />
                  <label
                    htmlFor="profilePhoto"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <Upload className="h-12 w-12 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">
                      Arraste uma foto ou clique para fazer upload
                    </span>
                  </label>
                  {profilePhoto && (
                    <div className="mt-4">
                      <img
                        src={URL.createObjectURL(profilePhoto)}
                        alt="Preview"
                        className="w-32 h-32 rounded-full mx-auto object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Informações Médicas</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="bloodGroup">Tipo Sanguíneo</Label>
                    <Input {...register('medicalInfo.bloodGroup')} />
                  </div>

                  <div>
                    <Label htmlFor="bloodPressure">Pressão Arterial</Label>
                    <Input {...register('medicalInfo.bloodPressure')} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sugarLevel">Nível de Glicose</Label>
                    <Input {...register('medicalInfo.sugarLevel')} />
                  </div>

                  <div>
                    <Label htmlFor="condition">Condição</Label>
                    <Input {...register('medicalInfo.condition')} />
                  </div>
                </div>

                <div>
                  <Label htmlFor="allergies">Alergias</Label>
                  <Textarea {...register('medicalInfo.allergies')} />
                </div>

                <div>
                  <Label htmlFor="medications">Medicamentos em Uso</Label>
                  <Textarea {...register('medicalInfo.medications')} />
                </div>

                <div>
                  <Label htmlFor="medicalHistory">Histórico Médico</Label>
                  <Textarea {...register('medicalInfo.medicalHistory')} />
                </div>

                <div>
                  <Label>Documentos e Exames</Label>
                  <div className="border-2 border-dashed rounded-lg p-6">
                    <input
                      type="file"
                      multiple
                      onChange={handleMedicalFilesChange}
                      className="hidden"
                      id="medicalFiles"
                    />
                    <label
                      htmlFor="medicalFiles"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <Upload className="h-8 w-8 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-600">
                        Adicionar documentos ou exames
                      </span>
                    </label>
                    {medicalFiles.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {medicalFiles.map((file, index) => (
                          <div key={index} className="text-sm text-gray-600">
                            {file.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              Salvar Paciente
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewPatientDialog;