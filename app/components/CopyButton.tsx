'use client';

import { SchemeSummary } from '@/lib/types';
import { useState } from 'react';
import styles from './CopyButton.module.css';

interface CopyButtonProps {
  summaryData: SchemeSummary;
  schemeName: string;
  onCopySuccess?: () => void;
}

export default function CopyButton({ summaryData, schemeName, onCopySuccess }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const textToCopy = `📋 Yojana Simplifier – ${schemeName}

✅ Overview
${summaryData.overview.map(item => `• ${item}`).join('\n')}

👤 Eligibility
${summaryData.eligibility.map(item => `• ${item}`).join('\n')}

📄 Documents Needed
${summaryData.documents.map(item => `• ${item}`).join('\n')}

📝 Steps to Apply
${summaryData.steps.map((item, i) => `${i + 1}. ${item}`).join('\n')}

⚠️ Always verify on the official portal before applying.`;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      if (onCopySuccess) onCopySuccess();
      
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <button 
      className={`btn-secondary ${styles.copyButton}`} 
      onClick={handleCopy}
      aria-label="Copy summary to clipboard"
    >
      <span aria-hidden="true" className={styles.icon}>{copied ? '✅' : '📋'}</span>
      {copied ? 'Copied!' : 'Copy summary'}
    </button>
  );
}
