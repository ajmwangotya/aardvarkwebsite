import { createStart, createMiddleware } from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";
import { createI18nForLang, langFromUrl } from "./lib/i18n-instance";

const localeMiddleware = createMiddleware().server(async ({ request, next }) => {
  const lang = langFromUrl(request.url);
  const i18n = await createI18nForLang(lang);
  return next({ context: { lang, i18n } });
});

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

export const startInstance = createStart(() => ({
  requestMiddleware: [localeMiddleware, errorMiddleware],
}));
