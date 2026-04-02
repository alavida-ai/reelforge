import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/broker/$slug")({
  component: BrokerLayout,
});

function BrokerLayout() {
  return <Outlet />;
}
