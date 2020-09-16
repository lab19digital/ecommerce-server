import store from "@/store/store";

export function auth(to: any, from: any, next: any) {
  /**
   * This action is to check and set the state, in case the user has
   * refreshed the page, after having logged in. The token and user object
   * will be in localStorage if the user has already logged in.
   */
  store.dispatch("session/checkLoggedIn");

  // Check if the user is logged in
  const isUserLoggedIn = store.getters["session/isAuthenticated"];
  const isAdmin = store.getters["session/isAdmin"];

  if (!isUserLoggedIn || isAdmin != 1) {
    // store.dispatch("logOut");
    next({
      path: "/login",
      query: { redirectFrom: to.fullPath },
    });
  } else {
    next();
  }
}
