const INKSTONE_BASE_URL = (
    import.meta.env.DEV
        ? "http://localhost:8080"
        : "https://inkstone.itswincer.com"
).replace(/\/$/, "");

export { INKSTONE_BASE_URL };
