import { AlertTriangle } from 'lucide-react';

function ErrorFallback({ error }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-center text-red-500 mb-4">
          <AlertTriangle size={48} />
        </div>
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-4">
          Ops! Algo deu errado
        </h1>
        <p className="text-gray-600 text-center mb-6">
          {error.message || 'Ocorreu um erro inesperado. Por favor, tente novamente.'}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
        >
          Recarregar página
        </button>
      </div>
    </div>
  );
}

export default ErrorFallback;