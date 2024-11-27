import { useQuery } from '@tanstack/react-query';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export function usePatientStats() {
  return useQuery({
    queryKey: ['patientStats'],
    queryFn: async () => {
      const patientsRef = collection(db, 'patients');
      
      // Get total patients
      const totalSnapshot = await getDocs(patientsRef);
      const total = totalSnapshot.size;

      // Get today's appointments
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const appointmentsQuery = query(
        collection(db, 'appointments'),
        where('date', '>=', today),
        where('date', '<', tomorrow)
      );
      const appointmentsSnapshot = await getDocs(appointmentsQuery);
      const todayAppointments = appointmentsSnapshot.size;

      // Get active treatments
      const activeQuery = query(
        patientsRef,
        where('status', '==', 'active')
      );
      const activeSnapshot = await getDocs(activeQuery);
      const activeTreatments = activeSnapshot.size;

      // Get pending returns
      const pendingQuery = query(
        patientsRef,
        where('status', '==', 'pending_return')
      );
      const pendingSnapshot = await getDocs(pendingQuery);
      const pendingReturns = pendingSnapshot.size;

      return {
        total,
        todayAppointments,
        activeTreatments,
        pendingReturns
      };
    },
    refetchInterval: 300000, // Refetch every 5 minutes
  });
}