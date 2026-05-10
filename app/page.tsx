import Header from './components/Header';
import SchemeSelector from './components/SchemeSelector';
import EmptyState from './components/EmptyState';
import Footer from './components/Footer';
import styles from './page.module.css';

export default function Home() {
  return (
    <>
      <Header />
      <main className="container">
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>Understand schemes in simple language</h1>
          <p className={styles.heroSubtitle}>
            Helping Karnataka citizens know who is eligible and how to apply.
          </p>
        </section>

        <section className={styles.selectorSection}>
          <SchemeSelector />
        </section>

        <section className={styles.contentSection}>
          <EmptyState />
          {/* SummarySections, ErrorBanner, LoadingSkeleton hidden initially */}
        </section>
      </main>
      <Footer />
    </>
  );
}
