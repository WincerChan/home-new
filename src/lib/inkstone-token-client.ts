const normalizePath = (pathname: string) => {
    const safePath = (pathname || "/").trim();
    const withSlash = safePath.startsWith("/") ? safePath : `/${safePath}`;
    return withSlash.endsWith("/") ? withSlash : `${withSlash}/`;
};

let cachedTokenMap: Record<string, string> | null = null;
const readTokenMap = () => {
    if (cachedTokenMap) return cachedTokenMap;
    if (typeof document === "undefined") return {};
    const node = document.getElementById("inkstone-token-map");
    if (!node?.textContent) {
        cachedTokenMap = {};
        return cachedTokenMap;
    }
    try {
        cachedTokenMap = JSON.parse(node.textContent) as Record<string, string>;
    } catch {
        cachedTokenMap = {};
    }
    return cachedTokenMap;
};

const getTokenForPath = (pathname: string) => {
    const path = normalizePath(pathname);
    const tokenMap = readTokenMap();
    return { path, token: tokenMap[path] ?? "" };
};

export { getTokenForPath, normalizePath, readTokenMap };
