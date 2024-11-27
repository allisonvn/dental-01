import {
  UserPlus,
  Calendar,
  DollarSign,
  Package,
  Plus,
  X,
} from 'lucide-react';
import { motion } from 'framer-motion';

const actions = [
  {
    icon: UserPlus,
    label: 'Novo Paciente',
    color: 'bg-blue-500',
    onClick: () => console.log('Novo Paciente'),
  },
  {
    icon: Calendar,
    label: 'Novo Agendamento',
    color: 'bg-green-500',
    onClick: () => console.log('Novo Agendamento'),
  },
  {
    icon: DollarSign,
    label: 'Registrar Pagamento',
    color: 'bg-yellow-500',
    onClick: () => console.log('Registrar Pagamento'),
  },
  {
    icon: Package,
    label: 'Adicionar ao Estoque',
    color: 'bg-purple-500',
    onClick: () => console.log('Adicionar ao Estoque'),
  },
];

function QuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="absolute right-0 top-16 w-72 bg-white rounded-lg shadow-lg border border-gray-200 p-4 mr-4"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-900">Ações Rápidas</h3>
        <button className="text-gray-500 hover:text-gray-700">
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="space-y-2">
        {actions.map((action) => (
          <button
            key={action.label}
            onClick={action.onClick}
            className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className={`p-2 rounded-lg ${action.color}`}>
              <action.icon className="h-5 w-5 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700">
              {action.label}
            </span>
          </button>
        ))}
      </div>
      <button className="mt-4 w-full flex items-center justify-center space-x-2 p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
        <Plus className="h-4 w-4" />
        <span className="text-sm font-medium">Personalizar Ações</span>
      </button>
    </motion.div>
  );
}

export default QuickActions;