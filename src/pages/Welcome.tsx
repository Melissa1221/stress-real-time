import React from 'react';
import { ROUTES } from '../shared/utils/routes';
import Card from '../components/Card';
import Button from '../components/Button';

const Welcome = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card>
        <div className="flex flex-col gap-6">
          {/* Title */}
          <div className="text-center">
            <h1 className="text-2xl font-medium mb-2">
              Bienvenido a Stress<span className="text-info-500">Minder</span>
            </h1>
            <p className="text-gray-600">
              Selecciona una opción:
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <Button
              text="Iniciar cuestionario"
              color="success"
              route={ROUTES.WELCOME_QUESTIONNAIRE}
            />
            
            <Button
              text="Ver historial"
              color="info"
              route={ROUTES.HISTORY}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Welcome;