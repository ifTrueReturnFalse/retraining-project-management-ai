const routes = {
  DASHBOARD: "/dashboard",
  PROJECT_LIST: "/project",
  PROJECT: (projectId: string) => `/project/${projectId}`,
  ACCOUNT: "/account",
};

export default routes;
