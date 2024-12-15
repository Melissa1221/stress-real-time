import { API_URL } from "../config/env";

declare const gapi: {
  load: (api: string, callback: () => void) => void;
  auth2: {
    init: (params: { client_id: string; cookiepolicy: string }) => void;
    getAuthInstance: () => {
      signIn: () => Promise<{
        getBasicProfile: () => {
          getName: () => string;
          getEmail: () => string;
        };
      }>;
    };
  };
};

declare const FB: {
  init: (params: { appId: string; cookie: boolean; xfbml: boolean; version: string }) => void;
  login: (callback: (response: { status: string }) => void, params: { scope: string }) => void;
  api: (endpoint: string, params: { fields: string }, callback: (response: { 
    name: string; 
    email: string; 
    id?: string; 
    error?: { message: string } 
  }) => void) => void;
};

interface AuthResponse {
  success: boolean;
  user?: {
    name: string;
    email: string;
    token?: string;
  };
  error?: string;
}


// interface LoginFormData {
//   grant_type?: string;
//   username: string;
//   password: string;
//   scope?: string;
//   client_id?: string;
//   client_secret?: string;
// }

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
}

export class AuthService {
  private static googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  private static facebookAppId = import.meta.env.VITE_FACEBOOK_APP_ID;

  static async initGoogleAuth(): Promise<void> {
    if (!this.googleClientId) {
      console.warn('ID de Cliente de Google no configurado.');
      return;
    }

    return new Promise((resolve) => {
      gapi.load('auth2', () => {
        gapi.auth2.init({
          client_id: this.googleClientId,
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });
    });
  }

  static async googleSignIn(): Promise<AuthResponse> {
    try {
      const auth2 = gapi.auth2.getAuthInstance();
      const googleUser = await auth2.signIn();
      const profile = googleUser.getBasicProfile();
      
      return {
        success: true,
        user: {
          name: profile.getName(),
          email: profile.getEmail()
        }
      };
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
      return {
        success: false,
        error: "Error al iniciar sesión con Google. Intenta nuevamente."
      };
    }
  }

  static initFacebookAuth(): void {
    if (!this.facebookAppId) {
      console.warn('ID de App de Facebook no configurado.');
      return;
    }
    
    // Facebook SDK is now initialized in index.html
  }

  static async facebookSignIn(): Promise<AuthResponse> {
    try {
      return new Promise((resolve) => {
        if (!FB) {
          resolve({
            success: false,
            error: "SDK de Facebook no está cargado."
          });
          return;
        }

        FB.login(
          (response) => {
            if (response.status === 'connected') {
              FB.api(
                '/me',
                { fields: 'name,email' },
                (userInfo) => {
                  if (userInfo && !userInfo.error) {
                    resolve({
                      success: true,
                      user: {
                        name: userInfo.name,
                        email: userInfo.email || `${userInfo.id}@facebook.com`
                      }
                    });
                  } else {
                    resolve({
                      success: false,
                      error: "No se pudo obtener la información del usuario."
                    });
                  }
                }
              );
            } else {
              resolve({
                success: false,
                error: "Inicio de sesión con Facebook cancelado o sin permisos."
              });
            }
          },
          { scope: 'public_profile,email' }
        );
      });
    } catch (error) {
      console.error("Error al iniciar sesión con Facebook:", error);
      return {
        success: false,
        error: "Error al iniciar sesión con Facebook. Intenta nuevamente."
      };
    }
  }

  static async emailSignIn(email: string, password: string): Promise<AuthResponse> {
    try {
      const formData = {
        username: email,
        password,
        grant_type: 'password'
      } as Record<string, string>;

      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.detail || 'Error al iniciar sesión. Verifica tus credenciales.'
        };
      }

      return {
        success: true,
        user: {
          name: email.split('@')[0],
          email,
          token: data.access_token
        }
      };
    } catch (error) {
      console.error('Error during login:', error);
      return {
        success: false,
        error: "Error al conectar con el servidor. Intenta nuevamente."
      };
    }
  }

  static async emailRegister(email: string, password: string): Promise<AuthResponse> {
    try {
      const registerData: RegisterFormData = {
        username: email.split('@')[0],
        email,
        password,
      };

      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.detail || 'Error al registrar. Verifica los datos ingresados.'
        };
      }

      return {
        success: true,
        user: {
          name: email.split('@')[0],
          email,
          token: data.access_token
        }
      };
    } catch (error) {
      console.error('Error during registration:', error);
      return {
        success: false,
        error: "Error al conectar con el servidor. Intenta nuevamente."
      };
    }
  }

  static async socialAuth(provider: 'google' | 'facebook', token: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_URL}/auth/${provider}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || `Error al autenticar con ${provider}.`
        };
      }

      return {
        success: true,
        user: {
          name: data.user.name,
          email: data.user.email,
          token: data.token
        }
      };
    } catch (error) {
      console.error(`Error during ${provider} auth:`, error);
      return {
        success: false,
        error: "Error al conectar con el servidor. Intenta nuevamente."
      };
    }
  }

  static async register(data: RegisterFormData): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: result.detail || 'Error al registrar. Verifica los datos ingresados.'
        };
      }

      return {
        success: true,
        user: {
          name: data.username,
          email: data.email,
          token: result.access_token
        }
      };
    } catch (error) {
      console.error('Error during registration:', error);
      return {
        success: false,
        error: "Error al conectar con el servidor. Intenta nuevamente."
      };
    }
  }
} 