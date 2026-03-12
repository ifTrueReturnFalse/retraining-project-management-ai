const routes = {
  DASHBOARD: "/dashboard",
  PROJECT_LIST: "/project",
  PROJECT: (projectId: string) => `/project/${projectId}`,
  ACCOUNT: "/account",
  LOGIN: "/login",
  SIGNIN: "/signin",
};

export default routes;
