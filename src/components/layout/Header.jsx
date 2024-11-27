import { Bell, Search, Settings, User, Menu } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import QuickActions from './QuickActions';

function Header({ toggleSidebar }) {
  const [showQuickActions, setShowQuickActions] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 fixed w-full top-0 z-30">
      <div className="h-16 px-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex items-center space-x-2">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center"
            >
              <span className="text-white font-bold">DO</span>
            </motion.div>
            <span className="text-xl font-semibold hidden sm:inline-block">
              DentalOffice
            </span>
          </div>
        </div>

        <div className="flex-1 max-w-2xl mx-4 hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowQuickActions(!showQuickActions)}
            className="p-2 hover:bg-gray-100 rounded-lg relative"
          >
            <span className="sr-only">Ações Rápidas</span>
            <span className="block w-5 h-0.5 bg-gray-600 mb-1"></span>
            <span className="block w-5 h-0.5 bg-gray-600 mb-1"></span>
            <span className="block w-5 h-0.5 bg-gray-600"></span>
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg relative">
            <Bell className="h-6 w-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Settings className="h-6 w-6" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <User className="h-6 w-6" />
          </button>
        </div>
      </div>
      {showQuickActions && <QuickActions />}
    </header>
  );
}

export default Header;