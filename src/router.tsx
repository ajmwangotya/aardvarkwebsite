import { QueryClient } from "@tanstack/react-query";
import type { i18n as I18nInstance } from "i18next";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import type { Lang } from "@/lib/i18n";

export type RouterContext = {
  queryClient: QueryClient;
  lang: Lang;
  i18n?: I18nInstance;
};

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient, lang: "en" } satisfies RouterContext,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
