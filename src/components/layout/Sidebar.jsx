import {
  LayoutDashboard,
  Users,
  Calendar,
  DollarSign,
  Package,
  FileText,
  Wrench,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const menuItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Visão Geral', path: 'dashboard' },
  { id: 'patients', icon: Users, label: 'Pacientes', path: 'patients' },
  { id: 'calendar', icon: Calendar, label: 'Agenda', path: 'calendar' },
  { id: 'financial', icon: DollarSign, label: 'Financeiro', path: 'financial' },
  { id: 'inventory', icon: Package, label: 'Estoque', path: 'inventory' },
  { id: 'documents', icon: FileText, label: 'Documentos', path: 'documents' },
  { id: 'tools', icon: Wrench, label: 'Ferramentas', path: 'tools' },
  { id: 'settings', icon: Settings, label: 'Configurações', path: 'settings' },
];

function Sidebar({ isOpen, toggleSidebar, currentPage, onPageChange }) {
  const handlePageChange = (path) => {
    if (onPageChange) {
      onPageChange(path);
    }
  };

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: isOpen ? 0 : -300 }}
      transition={{ duration: 0.3 }}
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 z-20 ${
        isOpen ? 'w-64' : 'w-0'
      }`}
    >
      <div className="p-4 h-full flex flex-col">
        <nav className="flex-1 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handlePageChange(item.path)}
                className={cn(
                  "w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                  currentPage === item.path
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <button
          onClick={toggleSidebar}
          className="mt-4 w-full flex items-center justify-center p-2 text-gray-500 hover:bg-gray-100 rounded-lg lg:hidden"
        >
          {isOpen ? (
            <ChevronLeft className="h-6 w-6" />
          ) : (
            <ChevronRight className="h-6 w-6" />
          )}
        </button>

        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Sistema Online</span>
          </div>
          <div className="text-xs text-gray-500">
            Última sincronização: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
    </motion.aside>
  );
}

export default Sidebar;