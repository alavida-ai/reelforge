import { createFileRoute, Outlet, useMatches } from "@tanstack/react-router";
import { Nav } from "@/components/nav";
import { ProductionProgress } from "@/components/production-progress";
import { getBroker } from "@/data/get-data";

export const Route = createFileRoute("/broker/$slug/produce")({
  component: ProduceLayout,
});

function ProduceLayout() {
  const { slug } = Route.useParams();
  const broker = getBroker(slug);
  const matches = useMatches();
  const currentPath = matches[matches.length - 1]?.fullPath ?? "";

  if (!broker) {
    return (
      <>
        <Nav />
        <div className="pt-14 max-w-5xl mx-auto px-6 py-12">
          <p className="text-muted-foreground">Broker not found.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Nav brokerSlug={broker.slug} brokerName={broker.name} />
      <div className="pt-14 max-w-5xl mx-auto px-6 py-6">
        {/* Progress stepper */}
        <div className="mb-6">
          <ProductionProgress currentPath={currentPath} />
        </div>

        {/* Page header */}
        <div className="mb-5">
          <h1 className="text-2xl font-bold">Hook Production</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Agentic pipeline — upload, analyze, match, assess risk.
          </p>
        </div>

        {/* Stage content */}
        <Outlet />
      </div>
    </>
  );
}
