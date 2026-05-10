import styles from './EmptyState.module.css';

export default function EmptyState() {
  return (
    <div className={styles.emptyState} role="status">
      <div className={styles.icon} aria-hidden="true">📋</div>
      <p className={styles.text}>
        Select a scheme to see a simple summary of who is eligible and how to apply.
      </p>
    </div>
  );
}
