import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../shared/utils/routes';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import { AuthService } from '../services/auth.service';

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Initialize auth services
    AuthService.initGoogleAuth().catch(console.error);
    AuthService.initFacebookAuth();
  }, []);

  const handleGoogleRegister = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const googleResponse = await AuthService.googleSignIn();
      if (!googleResponse.success) {
        setError(googleResponse.error || 'Error al registrarse con Google');
        return;
      }

      // Send the token to our backend
      const response = await AuthService.socialAuth('google', googleResponse.user?.token || '');
      if (response.success && response.user) {
        localStorage.setItem('user', JSON.stringify(response.user));
        navigate(ROUTES.FORM);
      } else {
        setError(response.error || 'Error al registrarse con Google');
      }
    } catch {
      setError('Error al procesar el registro con Google');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFacebookRegister = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const fbResponse = await AuthService.facebookSignIn();
      if (!fbResponse.success) {
        setError(fbResponse.error || 'Error al registrarse con Facebook');
        return;
      }

      // Send the token to our backend
      const response = await AuthService.socialAuth('facebook', fbResponse.user?.token || '');
      if (response.success && response.user) {
        localStorage.setItem('user', JSON.stringify(response.user));
        navigate(ROUTES.FORM);
      } else {
        setError(response.error || 'Error al registrarse con Facebook');
      }
    } catch {
      setError('Error al procesar el registro con Facebook');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    setIsLoading(true);
    setError('');

    const response = await AuthService.emailRegister(email, password);
    if (response.success && response.user) {
      localStorage.setItem('user', JSON.stringify(response.user));
      navigate(ROUTES.FORM);
    } else {
      setError(response.error || 'Error al registrarse');
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
              Regístrate en Stress<span className="text-info-500">Minder</span>
            </h1>
            <p className="text-gray-600">
              Crea una cuenta para acceder al cuestionario
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
              text="Registrarse con Google"
              color="primary"
              onClick={handleGoogleRegister}
              disabled={isLoading}
            />
            <Button
              text="Registrarse con Facebook"
              color="social"
              onClick={handleFacebookRegister}
              disabled={isLoading}
            />
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="h-px bg-gray-300 flex-1" />
            <span className="text-gray-500 text-sm">o</span>
            <div className="h-px bg-gray-300 flex-1" />
          </div>

          {/* Register Form */}
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

            <Input
              label="Confirmar Contraseña"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirma tu contraseña"
              disabled={isLoading}
            />

            <Button
              text={isLoading ? "Registrando..." : "Registrarse"}
              color="success"
              type="submit"
              disabled={isLoading}
            />
          </form>

          {/* Login Link */}
          <div className="text-center text-sm">
            <span className="text-gray-600">¿Ya tienes cuenta? </span>
            <Link 
              to={ROUTES.LOGIN} 
              className="text-info-500 hover:text-info-600"
            >
              Inicia sesión aquí
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Register;