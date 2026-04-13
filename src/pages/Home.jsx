import { useState } from "react";

import ReportModal from "../features/report/components/reportmodal";
import FloatingButton from "../shared/components/FloatingButton";
import { useReport } from "../features/report/hooks/useReport";

export default function Home() {
  const [open, setOpen] = useState(false);

  const { submitReport } = useReport();

  return (
    <div>
      <FloatingButton onClick={() => setOpen(true)} />

      <ReportModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={(data) => {
          submitReport(data);
          setOpen(false);
        }}
      />
    </div>
  );
}