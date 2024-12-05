export const ROUTES = {
  LOGIN: '/',
  REGISTER: '/register',
  WELCOME: '/welcome',
  QUESTIONNAIRE: '/questionnaire',
  WELCOME_QUESTIONNAIRE: '/welcome-questionnaire',
  HISTORY: '/history',
  FORM: '/form',
  FORM_2: '/form-2',
  RESULTS: '/results',
  QUESTIONNAIRE2: '/questionnaire2'
} as const;

// Type for route keys
export type RouteKeys = keyof typeof ROUTES;

// Type for route values
export type Routes = typeof ROUTES[RouteKeys];
