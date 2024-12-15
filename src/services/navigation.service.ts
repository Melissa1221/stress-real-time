import { ROUTES } from '../shared/utils/routes';

export class NavigationService {
  private static getBaseUrl() {
    return window.location.origin;
  }

  static navigateToLogin() {
    const baseUrl = this.getBaseUrl();
    window.location.replace(`${baseUrl}${ROUTES.LOGIN}`);
  }

  static navigateToRoute(route: string) {
    const baseUrl = this.getBaseUrl();
    window.location.replace(`${baseUrl}${route}`);
  }
} 