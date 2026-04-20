/**
 * Centralized application route configuration.
 * Provides a single source of truth for navigation paths and dynamic route generation.
 */
const routes = {
  DASHBOARD: "/dashboard",
  PROJECT_LIST: "/project",
  /** 
   * Generates a dynamic path for a specific project.
   * @param projectId - The unique identifier of the project.
   * @returns The formatted URL string for the project details page.
   */
  PROJECT: (projectId: string) => `/project/${projectId}`,
  ACCOUNT: "/account",
  LOGIN: "/login",
  SIGNIN: "/signin",
};

export default routes;
