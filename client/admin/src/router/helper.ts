import { auth } from "./auth";

export function beforeEachGernzy(to: any, from: any, next: any) {
  if (to.matched.some((record: any) => record.meta.requiresAuth)) {
    auth(to, from, next);
  } else {
    next();
  }
}
