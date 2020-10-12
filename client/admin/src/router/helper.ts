import { auth } from "./auth";

export function beforeEachGernzy(
  to: { matched: { some: Function }; fullPath: string },
  from: {},
  next: Function
) {
  if (to.matched.some((record: any) => record.meta.requiresAuth)) {
    auth(to, from, next);
  } else {
    next();
  }
}
