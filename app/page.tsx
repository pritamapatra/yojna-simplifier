import Header from './components/Header';
import MainContent from './components/MainContent';
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

        <MainContent />
      </main>
      <Footer />
    </>
  );
}
