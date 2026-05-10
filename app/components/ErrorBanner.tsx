'use client';

import styles from './ErrorBanner.module.css';

interface ErrorBannerProps {
  message: string;
  officialUrl: string;
  onRetry: () => void;
}

export default function ErrorBanner({ message, officialUrl, onRetry }: ErrorBannerProps) {
  return (
    <div className={styles.errorBanner} role="alert">
      <div className={styles.errorIcon} aria-hidden="true">⚠️</div>
      <div className={styles.errorContent}>
        <h2 className={styles.errorTitle}>Could not fetch scheme details right now.</h2>
        <p className={styles.errorMessage}>{message}</p>
        <div className={styles.errorActions}>
          <button
            className="btn-primary"
            onClick={onRetry}
            aria-label="Try fetching scheme details again"
          >
            Try again
          </button>
          <a
            href={officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.officialLink}
            aria-label="Open the official government website in a new tab"
          >
            Open official site ↗
          </a>
        </div>
      </div>
    </div>
  );
}
