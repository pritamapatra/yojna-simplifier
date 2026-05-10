import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className="container">
        <p className={styles.disclaimer}>
          Information shown here is summarised from official government websites. Always verify details on the official portal before applying.
        </p>
      </div>
    </footer>
  );
}
