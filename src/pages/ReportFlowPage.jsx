import { useParams } from "react-router-dom";

import ReportFlow from "../features/report/components/ReportFlow";

export default function ReportFlowPage() {
  const { tipo } = useParams();

  return <ReportFlow tipo={tipo} />;
}
