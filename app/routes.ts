import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout("routes/layout.tsx", [
        index("routes/home.tsx"),
        route("upload", "routes/upload.tsx"),
        route("settings", "routes/settings.tsx"),
        route("documents", "routes/documents.tsx"),
    ]),
] satisfies RouteConfig;
