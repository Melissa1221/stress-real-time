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
  };
  error?: string;
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
      // Here you would typically make an API call to your backend
      // For now, we'll just simulate a successful login
      if (email && password) {
        return {
          success: true,
          user: {
            name: email.split('@')[0],
            email
          }
        };
      }
      return {
        success: false,
        error: "Por favor, completa todos los campos."
      };
    } catch {
      return {
        success: false,
        error: "Error al iniciar sesión. Verifica tus credenciales."
      };
    }
  }
} 