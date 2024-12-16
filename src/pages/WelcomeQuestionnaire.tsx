// import { useState } from 'react';
import { ROUTES } from '../shared/utils/routes';
import Card from '../components/Card';
import Button from '../components/Button';

const WelcomeQuestionnaire = () => {
  // const [sensorsActivated, setSensorsActivated] = useState(false);
  // const [cameraActivated, setCameraActivated] = useState(false);

  // const handleActivateSensors = () => {
  //   // Handle sensors activation logic here
  //   setSensorsActivated(true);
  // };

  // const handleActivateCamera = () => {
  //   // Handle camera activation logic here
  //   setCameraActivated(true);
  // };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card>
        <div className="flex flex-col gap-6">
          {/* Title */}
          <div className="text-center">
            <h1 className="text-2xl font-medium mb-2">
              Cuestionario de Estrés
            </h1>
            <p className="text-gray-600 text-center">
              Para obtener resultados más completos, te recomendamos activar los sensores y la cámara.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            {/* <Button
              text="Activar Sensores"
              color="success"
              onClick={handleActivateSensors}
              disabled={sensorsActivated}
            />
            
            <Button
              text="Activar Cámara"
              color="info"
              onClick={handleActivateCamera}
              disabled={cameraActivated}
            /> */}

            <div className="mt-4">
              <Button
                text="Comenzar Cuestionario"
                color="success"
                route={ROUTES.QUESTIONNAIRE2}
                // disabled={!sensorsActivated || !cameraActivated}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default WelcomeQuestionnaire;