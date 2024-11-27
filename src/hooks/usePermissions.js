import { useAuth } from '@/contexts/AuthContext';
import { hasPermission, getUserPermissions } from '@/lib/rbac';

export function usePermissions() {
  const { user } = useAuth();

  const can = (permission) => {
    return hasPermission(user?.role, permission);
  };

  const getAllPermissions = () => {
    return getUserPermissions(user?.role);
  };

  return {
    can,
    getAllPermissions,
  };
}