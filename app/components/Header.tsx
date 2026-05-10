import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header} role="banner">
      <div className={`container ${styles.headerInner}`}>
        <div className={styles.brand}>
          <span className={styles.logo} aria-hidden="true">🏛️</span>
          <h1 className={styles.wordmark}>Yojana Simplifier</h1>
        </div>
        <div className={styles.meta}>
          <span className="badge">Beta</span>
          <span className={styles.disclaimer}>Not an official govt website</span>
        </div>
      </div>
    </header>
  );
}
