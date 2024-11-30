import React from 'react';
import Card from '../components/Card';

const History = () => {
  // This could be replaced with actual results data later
  const hasResults = false;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card>
        <div className="flex flex-col gap-6">
          {/* Title */}
          <div className="text-center">
            <h1 className="text-2xl font-medium mb-2">
              Historial de Resultados
            </h1>
            <p className="text-gray-600 text-center">
              Observa tus resultados anteriores para evaluar cambios en tu nivel de estrés a lo largo del tiempo.
            </p>
          </div>

          {/* Results or No Results Message */}
          {hasResults ? (
            <div className="flex flex-col gap-4">
              {/* Results will go here when available */}
            </div>
          ) : (
            <div className="bg-gray-100 rounded-md p-4 text-center">
              <p className="text-gray-700">
                No hay re<span className="text-info-500">sul</span>tados previos.
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default History;