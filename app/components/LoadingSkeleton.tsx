import styles from './LoadingSkeleton.module.css';

export default function LoadingSkeleton() {
  return (
    <div className={styles.skeletonWrapper} role="status" aria-label="Loading scheme details">
      <span className="sr-only">Fetching details from official portal (this may take 10-15 seconds)…</span>

      {[1, 2, 3].map((i) => (
        <div key={i} className={`card ${styles.skeletonCard}`}>
          <div className={styles.skeletonHeader}>
            <div className={`${styles.skeletonLine} ${styles.lineTitle}`} />
            <div className={`${styles.skeletonLine} ${styles.lineBadge}`} />
          </div>
          <div className={styles.skeletonBody}>
            <div className={`${styles.skeletonLine} ${styles.lineFull}`} />
            <div className={`${styles.skeletonLine} ${styles.lineMedium}`} />
            <div className={`${styles.skeletonLine} ${styles.lineShort}`} />
          </div>
        </div>
      ))}

      <p className={styles.loadingText}>Fetching details from official portal (this may take 10-15 seconds)…</p>
    </div>
  );
}
