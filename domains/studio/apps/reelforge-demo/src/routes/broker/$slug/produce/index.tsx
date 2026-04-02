import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { UploadStage } from "@/components/upload-stage";
import { getBroker } from "@/data/get-data";

export const Route = createFileRoute("/broker/$slug/produce/")({
  component: UploadIndexPage,
});

function UploadIndexPage() {
  const { slug } = Route.useParams();
  const broker = getBroker(slug);
  const navigate = useNavigate();

  if (!broker) {
    return <p className="text-muted-foreground p-6">Broker not found.</p>;
  }

  return (
    <Card>
      <CardContent className="p-5">
        <UploadStage
          broker={broker}
          onStart={() =>
            navigate({
              to: "/broker/$slug/produce/analysis",
              params: { slug },
            })
          }
          started={false}
        />
      </CardContent>
    </Card>
  );
}
