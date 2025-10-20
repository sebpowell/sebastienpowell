import { type DynamicRoute } from 'next-typesafe-url';
import { object, string, TypeOf } from 'zod';

export const BlogArticleRoute = {
  routeParams: object({
    handle: string(),
  }),
} satisfies DynamicRoute;

export type BlogArticleRouteParams = TypeOf<
  typeof BlogArticleRoute.routeParams
>;

export type RouteType = typeof BlogArticleRoute;
