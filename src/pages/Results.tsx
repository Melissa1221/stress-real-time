import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import { ROUTES } from '../shared/utils/routes';
import { StressService } from '../services/stress.service';

const Results = () => {
  const navigate = useNavigate();
  const [stressData, setStressData] = useState<{
    percentage: number;
    state: string;
    description: string;
    suggestion: string;
    consequences: string;
  } | null>(null);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const userStr = localStorage.getItem('user');
        if (!userStr) {
          navigate(ROUTES.LOGIN);
          return;
        }

        const user = JSON.parse(userStr);
        if (!user.token) {
          navigate(ROUTES.LOGIN);
          return;
        }

        const response = await StressService.getAnalysis(user.token);
        
        if (response.success && response.data) {
          setStressData({
            percentage: response.data.stress_percentage,
            state: response.data.state,
            description: response.data.description,
            suggestion: response.data.suggestion,
            consequences: response.data.consequences
          });
        } else {
          if (response.error?.includes('Sesión expirada')) {
            navigate(ROUTES.LOGIN);
          } else {
            setError(response.error || 'Error al cargar los resultados');
          }
        }
      } catch {
        setError('Error al procesar la solicitud');
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card>
        <div className="flex flex-col gap-6">
          {/* Title */}
          <div className="text-center">
            <h1 className="text-2xl font-medium mb-2">
              Resultados de Estrés
            </h1>
            <p className="text-gray-600">
              A continuación se muestran los resultados del análisis.
            </p>
          </div>

          {error && (
            <div className="bg-primary-50 text-primary-500 p-3 rounded-md text-sm">
              {error}
            </div>
          )}

          {isLoading ? (
            <div className="text-center text-gray-600">Cargando resultados...</div>
          ) : (
            <>
              {!isLoading && stressData && (
                <>
                  <div className="flex flex-col gap-4">
                    {/* Nivel de Estrés */}
                    <div className="text-center">
                      <h2 className="text-xl font-medium mb-2">Nivel de Estrés: {stressData.state}</h2>
                      <div className="text-3xl font-bold text-primary-600">{stressData.percentage}%</div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                        <div
                          className="bg-primary-500 h-2.5 rounded-full transition-all duration-300"
                          style={{ width: `${stressData.percentage}%` }}
                        />
                      </div>
                    </div>

                    {/* Descripción */}
                    <div className="bg-white p-4 rounded-lg shadow">
                      <h3 className="font-medium mb-2">Descripción</h3>
                      <p className="text-gray-700">{stressData.description}</p>
                    </div>

                    {/* Sugerencias */}
                    <div className="bg-info-50 p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Sugerencias</h3>
                      <p className="text-gray-700">{stressData.suggestion}</p>
                    </div>

                    {/* Consecuencias */}
                    <div className="bg-warning-50 p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Consecuencias a Largo Plazo</h3>
                      <p className="text-gray-700">{stressData.consequences}</p>
                    </div>
                  </div>
                </>
              )}
            </>
          )}

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