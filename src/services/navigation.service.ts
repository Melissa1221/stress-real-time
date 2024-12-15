import { ROUTES } from '../shared/utils/routes';

export class NavigationService {
  static navigateToLogin() {
    window.location.replace(ROUTES.LOGIN);
  }

  static navigateToRoute(route: string) {
    window.location.replace(route);
  }
} 