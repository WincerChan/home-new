import { useLocation } from "@solidjs/router";
import { createEffect } from "solid-js";
import { getTokenForPath } from "../lib/inkstone-token-client";

const setMetaContent = (name: string, content: string) => {
    if (typeof document === "undefined") return;
    let meta = document.querySelector(
        `meta[name="${name}"]`,
    ) as HTMLMetaElement | null;
    if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", name);
        document.head.appendChild(meta);
    }
    meta.setAttribute("content", content);
};

const InkstoneMetaClient = () => {
    const location = useLocation();

    createEffect(() => {
        const { path, token } = getTokenForPath(location.pathname);
        setMetaContent("inkstone:path", path);
        setMetaContent("inkstone:token", token);
    });

    return null;
};

export default InkstoneMetaClient;
