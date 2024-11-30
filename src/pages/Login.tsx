import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../shared/utils/routes';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import { AuthService } from '../services/auth.service';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Initialize auth services
    AuthService.initGoogleAuth().catch(console.error);
    AuthService.initFacebookAuth();
  }, []);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError('');
    
    const response = await AuthService.googleSignIn();
    if (response.success && response.user) {
      // Store user data in localStorage or state management
      localStorage.setItem('user', JSON.stringify(response.user));
      navigate(ROUTES.FORM);
    } else {
      setError(response.error || 'Error al iniciar sesión con Google');
    }
    
    setIsLoading(false);
  };

  const handleFacebookLogin = async () => {
    setIsLoading(true);
    setError('');
    
    const response = await AuthService.facebookSignIn();
    if (response.success && response.user) {
      localStorage.setItem('user', JSON.stringify(response.user));
      navigate(ROUTES.FORM);
    } else {
      setError(response.error || 'Error al iniciar sesión con Facebook');
    }
    
    setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const response = await AuthService.emailSignIn(email, password);
    if (response.success && response.user) {
      localStorage.setItem('user', JSON.stringify(response.user));
      navigate(ROUTES.FORM);
    } else {
      setError(response.error || 'Error al iniciar sesión');
    }

    setIsLoading(false);
  };

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
              Inicia sesión para acceder al cuestionario
            </p>
          </div>

          {error && (
            <div className="bg-primary-50 text-primary-500 p-3 rounded-md text-sm">
              {error}
            </div>
          )}

          {/* Social Buttons */}
          <div className="flex flex-col gap-3">
            <Button
              text="Iniciar sesión con Google"
              color="primary"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            />
            <Button
              text="Iniciar sesión con Facebook"
              color="social"
              onClick={handleFacebookLogin}
              disabled={isLoading}
            />
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="h-px bg-gray-300 flex-1" />
            <span className="text-gray-500 text-sm">o</span>
            <div className="h-px bg-gray-300 flex-1" />
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="Correo Electrónico"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="correo@ejemplo.com"
              disabled={isLoading}
              validation={{
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Por favor ingresa un correo válido"
              }}
            />

            <Input
              label="Contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              disabled={isLoading}
            />

            <Button
              text={isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
              color="success"
              type="submit"
              disabled={isLoading}
            />
          </form>

          {/* Register Link */}
          <div className="text-center text-sm">
            <span className="text-gray-600">¿No tienes cuenta? </span>
            <Link 
              to={ROUTES.REGISTER} 
              className="text-info-500 hover:text-info-600"
            >
              Regístrate aquí
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Login;