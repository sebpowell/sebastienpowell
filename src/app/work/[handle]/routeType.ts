import { type DynamicRoute } from 'next-typesafe-url';
import { object, string, TypeOf } from 'zod';

export const WorkRoute = {
  routeParams: object({
    handle: string(),
  }),
} satisfies DynamicRoute;

export type WorkRouteParams = TypeOf<
  typeof WorkRoute.routeParams
>;

export type RouteType = typeof WorkRoute;
