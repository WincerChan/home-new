import { useLocation } from "@solidjs/router";
import { createEffect, createSignal, onCleanup, onMount } from "solid-js";
import { createTracker, type Tracker } from "@wincer/inkstone-track";
import { getTokenForPath } from "../lib/inkstone-token-client";
import { INKSTONE_BASE_URL } from "../lib/inkstone-base";

const InkstoneTrackerClient = () => {
    const location = useLocation();
    const [tracker, setTracker] = createSignal<Tracker | null>(null);

    onMount(() => {
        const instance = createTracker({
            baseUrl: INKSTONE_BASE_URL,
            siteHost: "itswincer.com",
            isDev: import.meta.env.DEV,
            debug: true,
        });
        instance.bindVisibility();
        setTracker(instance);

        const handlePageHide = () => {
            instance.trackEngage(true);
        };
        window.addEventListener("pagehide", handlePageHide);
        onCleanup(() => window.removeEventListener("pagehide", handlePageHide));
    });

    createEffect(() => {
        const instance = tracker();
        if (!instance) return;
        const { path, token } = getTokenForPath(location.pathname);
        instance.trackPage(path, token);
    });

    return null;
};

export default InkstoneTrackerClient;
