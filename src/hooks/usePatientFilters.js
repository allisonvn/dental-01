import { useState, useCallback } from 'react';

export const usePatientFilters = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDoctor, setSelectedDoctor] = useState('all');
  const [advancedFilters, setAdvancedFilters] = useState({
    statuses: [],
    dentist: 'all',
    dateRange: { start: '', end: '' },
    ageRange: { min: '', max: '' },
    gender: 'all',
    insurance: 'all'
  });

  const filterPatients = useCallback((patients) => {
    return patients?.filter(patient => {
      // Basic search filter
      const matchesSearch = searchTerm === '' || 
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.cpf?.includes(searchTerm) ||
        patient.phone?.includes(searchTerm);

      // Quick filters
      const matchesStatus = selectedStatus === 'all' || patient.status === selectedStatus;
      const matchesDoctor = selectedDoctor === 'all' || patient.doctor === selectedDoctor;

      // Advanced filters
      const matchesAdvancedStatus = advancedFilters.statuses.length === 0 || 
        advancedFilters.statuses.includes(patient.status);
      
      const matchesAdvancedDoctor = !advancedFilters.dentist || 
        advancedFilters.dentist === 'all' || 
        patient.doctor === advancedFilters.dentist;

      const matchesDateRange = !advancedFilters.dateRange.start || 
        !advancedFilters.dateRange.end || 
        (new Date(patient.createdAt) >= new Date(advancedFilters.dateRange.start) &&
         new Date(patient.createdAt) <= new Date(advancedFilters.dateRange.end));

      return matchesSearch && 
             matchesStatus && 
             matchesDoctor && 
             matchesAdvancedStatus && 
             matchesAdvancedDoctor && 
             matchesDateRange;
    }) || [];
  }, [searchTerm, selectedStatus, selectedDoctor, advancedFilters]);

  return {
    searchTerm,
    setSearchTerm,
    selectedStatus,
    setSelectedStatus,
    selectedDoctor,
    setSelectedDoctor,
    advancedFilters,
    setAdvancedFilters,
    filterPatients
  };
};