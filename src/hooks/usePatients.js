import { useCallback } from 'react';
import { 
  collection,
  query,
  where,
  orderBy,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';

export function usePatients() {
  const getPatients = useCallback(async (searchTerm = '', filters = {}) => {
    try {
      let q = collection(db, 'patients');

      // Apply filters
      if (filters.status && filters.status !== 'all') {
        q = query(q, where('status', '==', filters.status));
      }
      
      if (filters.doctor && filters.doctor !== 'all') {
        q = query(q, where('doctor', '==', filters.doctor));
      }

      // Add ordering
      q = query(q, orderBy('name'));

      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching patients:', error);
      throw error;
    }
  }, []);

  const addPatient = useCallback(async (patientData, photo = null) => {
    try {
      // Upload photo if provided
      let photoUrl = null;
      if (photo) {
        const photoRef = ref(storage, `patients/${Date.now()}_${photo.name}`);
        await uploadBytes(photoRef, photo);
        photoUrl = await getDownloadURL(photoRef);
      }

      // Create search terms array for better searching
      const searchTerms = [
        patientData.name.toLowerCase(),
        patientData.cpf.replace(/\D/g, ''),
        patientData.phone.replace(/\D/g, ''),
        patientData.email.toLowerCase(),
      ].filter(Boolean);

      const docRef = await addDoc(collection(db, 'patients'), {
        ...patientData,
        photoUrl,
        searchTerms,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      return {
        id: docRef.id,
        ...patientData,
        photoUrl,
      };
    } catch (error) {
      console.error('Error adding patient:', error);
      throw error;
    }
  }, []);

  const updatePatient = useCallback(async (patientId, patientData, photo = null) => {
    try {
      const patientRef = doc(db, 'patients', patientId);

      // Upload new photo if provided
      let photoUrl = patientData.photoUrl;
      if (photo) {
        const photoRef = ref(storage, `patients/${Date.now()}_${photo.name}`);
        await uploadBytes(photoRef, photo);
        photoUrl = await getDownloadURL(photoRef);
      }

      // Update search terms
      const searchTerms = [
        patientData.name.toLowerCase(),
        patientData.cpf.replace(/\D/g, ''),
        patientData.phone.replace(/\D/g, ''),
        patientData.email.toLowerCase(),
      ].filter(Boolean);

      await updateDoc(patientRef, {
        ...patientData,
        photoUrl,
        searchTerms,
        updatedAt: serverTimestamp(),
      });

      return {
        id: patientId,
        ...patientData,
        photoUrl,
      };
    } catch (error) {
      console.error('Error updating patient:', error);
      throw error;
    }
  }, []);

  const deletePatient = useCallback(async (patientId) => {
    try {
      await deleteDoc(doc(db, 'patients', patientId));
    } catch (error) {
      console.error('Error deleting patient:', error);
      throw error;
    }
  }, []);

  return {
    getPatients,
    addPatient,
    updatePatient,
    deletePatient,
  };
}