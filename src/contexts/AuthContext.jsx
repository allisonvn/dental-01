import { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  sendEmailVerification
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { kiwifyAPI } from '@/lib/kiwify';
import toast from 'react-hot-toast';

const AuthContext = createContext({});

const FAILED_ATTEMPTS_LIMIT = 5;
const BLOCK_DURATION = 15 * 60 * 1000; // 15 minutes

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [blockUntil, setBlockUntil] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const userData = docSnap.data();
          // Check Kiwify subscription status
          if (userData.kiwifyCustomerId) {
            try {
              const customer = await kiwifyAPI.getCustomer(userData.kiwifyCustomerId);
              userData.subscription = customer.subscription;
            } catch (error) {
              console.error('Error fetching Kiwify subscription:', error);
            }
          }
          setUser({ ...user, ...userData });
        } else {
          setUser(user);
        }

        // Record login device
        const deviceInfo = {
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString(),
        };
        await updateDoc(docRef, {
          lastLogin: new Date().toISOString(),
          devices: [...(docSnap.data()?.devices || []), deviceInfo],
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const isBlocked = () => {
    if (!blockUntil) return false;
    return new Date() < new Date(blockUntil);
  };

  const signUp = async (email, password, userData) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      
      // Create Kiwify customer
      const kiwifyCustomer = await kiwifyAPI.createCustomer({
        email: email,
        name: userData.name,
        phone: userData.phone,
      });

      await setDoc(doc(db, 'users', user.uid), {
        ...userData,
        kiwifyCustomerId: kiwifyCustomer.id,
        createdAt: new Date().toISOString(),
        role: 'user',
        verified: false,
      });

      // Send verification email
      await sendEmailVerification(user);

      toast.success('Conta criada com sucesso! Verifique seu e-mail.');
      return user;
    } catch (error) {
      console.error('Erro ao criar conta:', error);
      toast.error(error.message);
      throw error;
    }
  };

  const signIn = async (email, password, remember = false) => {
    if (isBlocked()) {
      const remainingTime = Math.ceil((new Date(blockUntil) - new Date()) / 1000 / 60);
      throw new Error(`Conta bloqueada. Tente novamente em ${remainingTime} minutos.`);
    }

    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      
      if (!user.emailVerified) {
        throw new Error('Por favor, verifique seu e-mail antes de fazer login.');
      }

      // Reset failed attempts on successful login
      setFailedAttempts(0);
      setBlockUntil(null);

      if (remember) {
        localStorage.setItem('rememberMe', 'true');
      }

      toast.success('Login realizado com sucesso!');
      return user;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      
      // Increment failed attempts
      const newFailedAttempts = failedAttempts + 1;
      setFailedAttempts(newFailedAttempts);

      if (newFailedAttempts >= FAILED_ATTEMPTS_LIMIT) {
        const blockTime = new Date(Date.now() + BLOCK_DURATION);
        setBlockUntil(blockTime);
        throw new Error(`Muitas tentativas incorretas. Conta bloqueada por 15 minutos.`);
      }

      toast.error('E-mail ou senha inválidos');
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      localStorage.removeItem('rememberMe');
      toast.success('Logout realizado com sucesso!');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      toast.error('Erro ao fazer logout');
      throw error;
    }
  };

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('E-mail de recuperação enviado!');
    } catch (error) {
      console.error('Erro ao enviar e-mail de recuperação:', error);
      toast.error('Erro ao enviar e-mail de recuperação');
      throw error;
    }
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    isBlocked,
    failedAttempts,
    blockUntil,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}