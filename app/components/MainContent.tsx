'use client';

import { useState } from 'react';
import SchemeSelector from './SchemeSelector';
import EmptyState from './EmptyState';
import LoadingSkeleton from './LoadingSkeleton';
import ErrorBanner from './ErrorBanner';
import SummarySections from './SummarySections';
import { SchemeSummary } from '@/lib/types';

type PageState = 'idle' | 'loading' | 'success' | 'error';

export default function MainContent() {
  const [pageState, setPageState] = useState<PageState>('idle');
  const [selectedSchemeId, setSelectedSchemeId] = useState<string | null>(null);
  const [summaryData, setSummaryData] = useState<SchemeSummary | null>(null);
  const [errorInfo, setErrorInfo] = useState<{ message: string; officialUrl: string } | null>(null);

  const fetchSchemeDetails = async (schemeId: string) => {
    setSelectedSchemeId(schemeId);
    setPageState('loading');
    setErrorInfo(null);

    try {
      const response = await fetch('/api/scheme-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ schemeId }),
      });

      const data = await response.json();

      if (data.success && data.data) {
        setSummaryData(data.data);
        setPageState('success');
      } else {
        setErrorInfo({
          message: data.error || 'Failed to fetch details.',
          officialUrl: data.officialUrl || '#',
        });
        setPageState('error');
      }
    } catch (err) {
      setErrorInfo({
        message: 'A network error occurred. Please try again later.',
        officialUrl: '#',
      });
      setPageState('error');
    }
  };

  const handleRetry = () => {
    if (selectedSchemeId) {
      fetchSchemeDetails(selectedSchemeId);
    }
  };

  return (
    <>
      <section style={{ maxWidth: '600px', margin: '0 auto var(--space-xl)' }}>
        <SchemeSelector onSchemeSelect={fetchSchemeDetails} isLoading={pageState === 'loading'} />
      </section>

      <section style={{ maxWidth: '800px', margin: '0 auto' }}>
        {pageState === 'idle' && <EmptyState />}
        {pageState === 'loading' && <LoadingSkeleton />}
        {pageState === 'error' && errorInfo && (
          <ErrorBanner
            message={errorInfo.message}
            officialUrl={errorInfo.officialUrl}
            onRetry={handleRetry}
          />
        )}
        {pageState === 'success' && summaryData && (
          <SummarySections data={summaryData} />
        )}
      </section>
    </>
  );
}
