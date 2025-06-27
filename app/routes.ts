import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("./routes/home.tsx"),
  layout("./layouts/auth.tsx", [route("/auth", "./routes/auth.tsx")]),
  layout("./layouts/main.tsx", [
    route("/catalog", "./routes/catalog.tsx"),
    route("/configurations", "./routes/configurations.tsx"),
  ]),
] satisfies RouteConfig;
