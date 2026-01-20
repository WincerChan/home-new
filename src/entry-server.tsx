// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";
import { getRequestEvent } from "solid-js/web";
import { buildTokenMap, createInkstoneToken, normalizePath } from "./lib/inkstone-token.server";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => {
      const secret = process.env.INKSTONE_PUBLIC_TOKEN_SECRET ?? "";
      const requestEvent = getRequestEvent();
      const requestUrl = requestEvent
        ? new URL(requestEvent.request.url)
        : null;
      const path = normalizePath(requestUrl?.pathname ?? "/");
      const token = secret ? createInkstoneToken(path, secret) : "";
      const tokenMap = buildTokenMap(secret);

      return (
        <html lang="en">
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link
              rel="icon"
              href="https://cdn.jsdelivr.net/npm/@wincer/icons@0.1.0/icons/light.svg"
              type="image/svg+xml"
              media="(prefers-color-scheme: light)"
            />
            <link
              rel="icon"
              href="https://cdn.jsdelivr.net/npm/@wincer/icons@0.1.0/icons/dark.svg"
              type="image/svg+xml"
              media="(prefers-color-scheme: dark)"
            />
            <meta name="inkstone:path" content={path} />
            <meta name="inkstone:token" content={token} />
            <script id="inkstone-token-map" type="application/json">
              {JSON.stringify(tokenMap)}
            </script>
            {assets}
          </head>
          <body>
            <div id="app">{children}</div>
            {scripts}
          </body>
        </html>
      );
    }}
  />
));
