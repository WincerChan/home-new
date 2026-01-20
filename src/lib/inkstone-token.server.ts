import { createHmac } from "node:crypto";
import fileRoutes from "vinxi/routes";

const normalizePath = (pathname: string) => {
    const safePath = (pathname || "/").trim();
    const withSlash = safePath.startsWith("/") ? safePath : `/${safePath}`;
    return withSlash.endsWith("/") ? withSlash : `${withSlash}/`;
};

const toBase64Url = (input: string) =>
    Buffer.from(input, "utf8")
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");

const toBase64UrlFromBase64 = (input: string) =>
    input.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

const createInkstoneToken = (path: string, secret: string) => {
    if (!secret) return "";
    const payloadB64 = toBase64Url(JSON.stringify({ path }));
    const signatureB64 = createHmac("sha256", secret)
        .update(payloadB64)
        .digest("base64");
    return `${payloadB64}.${toBase64UrlFromBase64(signatureB64)}`;
};

const isDynamicPath = (path: string) =>
    path.includes(":") || path.includes("*") || path.includes("[") || path.includes("]");

export const getRoutePatterns = () => {
    const paths = new Set<string>();
    for (const route of fileRoutes) {
        if (!route?.path) continue;
        if (isDynamicPath(route.path)) continue;
        paths.add(route.path);
    }
    return Array.from(paths);
};

const buildTokenMap = (secret: string) => {
    if (!secret) return {};
    const map: Record<string, string> = {};
    for (const rawPath of getRoutePatterns()) {
        const path = normalizePath(rawPath);
        const token = createInkstoneToken(path, secret);
        if (token) map[path] = token;
    }
    return map;
};

export { buildTokenMap, createInkstoneToken, normalizePath };
