import { useParams, useSearchParams } from "react-router-dom";

import ReportesDetailPage from "../features/incidents/components/ReportesDetailPage";

export default function ReportDetailPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  return (
    <ReportesDetailPage
      id={id}
      tipo={searchParams.get("tipo")}
    />
  );
}
