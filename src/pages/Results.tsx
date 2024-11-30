import React from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { ROUTES } from '../shared/utils/routes';

const Results = () => {
  // Get the stress percentage from localStorage
  const stressPercentage = localStorage.getItem('questionnaireStress') || '0';

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card>
        <div className="flex flex-col gap-6">
          {/* Title */}
          <div className="text-center">
            <h1 className="text-2xl font-medium mb-2">
              Resultados de Estrés
            </h1>
            <p className="text-gray-600 text-center">
              A continuación se muestran los resultados del cuestionario y de los dispositivos de monitoreo.
            </p>
          </div>

          {/* Questionnaire Results */}
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-medium text-center">
              Resultado del Cuestionario
            </h2>
            <div className="text-center text-gray-700">
              Porcentaje de estrés: {stressPercentage}%
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-success-500 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${stressPercentage}%` }}
              />
            </div>
          </div>

          {/* Camera Results */}
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-medium text-center">
              Resultado de la Cámara
            </h2>
            <div className="bg-gray-100 rounded-md p-4 text-center">
              <p className="text-gray-700">
                No hay resultados que analizar
              </p>
            </div>
          </div>

          {/* Sensors Results */}
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-medium text-center">
              Resultado de los Sensores
            </h2>
            <div className="bg-gray-100 rounded-md p-4 text-center">
              <p className="text-gray-700">
                No hay resultados que analizar
              </p>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-4">
            <Button
              text="Volver al Inicio"
              color="info"
              route={ROUTES.WELCOME}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Results; 