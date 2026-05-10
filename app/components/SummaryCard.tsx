import styles from './SummaryCard.module.css';

interface SummaryCardProps {
  title: string;
  items: string[];
  type: 'bullets' | 'numbered';
}

export default function SummaryCard({ title, items, type }: SummaryCardProps) {
  const isFallback = items.length === 1 && items[0] === 'Information not clearly available on official page.';

  const ListTag = type === 'numbered' ? 'ol' : 'ul';

  return (
    <section className={`card ${styles.summaryCard}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <span className="badge">From official site</span>
      </div>
      <div className={styles.body}>
        {isFallback ? (
          <p className={styles.fallbackText}>{items[0]}</p>
        ) : (
          <ListTag className={styles.list}>
            {items.map((item, index) => (
              <li key={index} className={styles.listItem}>
                {item}
              </li>
            ))}
          </ListTag>
        )}
      </div>
    </section>
  );
}
