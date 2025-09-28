import type { Route } from "./+types/home";

import MainLayout from "~/components/Menu/MainLayout";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Layout() {
  return <MainLayout />;
}