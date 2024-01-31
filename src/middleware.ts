import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

let locales = ["en-US", "hr-HR", "hr"];

// Get the preferred locale, similar to the above or using a library
function getLocale(request: any) {
  const acceptLang = request.headers.get("accept-language");

  let headers = { "accept-language": acceptLang };

  let languages = new Negotiator({ headers: headers }).languages();
  let defaultLocale = "en-US";

  return match(languages, locales, defaultLocale);
}

export function middleware(request: any) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (
    pathnameHasLocale ||
    pathname.startsWith("/images") ||
    pathname.includes("/favicon.ico")
  )
    return;

  // Redirect if there is no locale
  const locale = getLocale(request);

  request.nextUrl.pathname = `/${locale}${pathname}`;
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return Response.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
};
