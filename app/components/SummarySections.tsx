import { SchemeSummary } from '@/lib/types';
import SummaryCard from './SummaryCard';

interface SummarySectionsProps {
  data: SchemeSummary;
}

export default function SummarySections({ data }: SummarySectionsProps) {
  return (
    <div className="summary-sections">
      <SummaryCard
        title="Overview"
        items={data.overview}
        type="bullets"
      />
      
      <SummaryCard
        title="Eligibility"
        items={data.eligibility}
        type="bullets"
      />

      <SummaryCard
        title="Documents Needed"
        items={data.documents}
        type="bullets"
      />

      <SummaryCard
        title="Steps to Apply"
        items={data.steps}
        type="numbered"
      />
    </div>
  );
}
