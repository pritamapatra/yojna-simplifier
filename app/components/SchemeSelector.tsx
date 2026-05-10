'use client';

import { useState } from 'react';
import { SCHEMES } from '@/lib/schemes';
import styles from './SchemeSelector.module.css';

interface SchemeSelectorProps {
  onSchemeSelect?: (schemeId: string) => void;
  isLoading?: boolean;
}

export default function SchemeSelector({ onSchemeSelect, isLoading = false }: SchemeSelectorProps) {
  const [selectedId, setSelectedId] = useState<string>('');

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedId(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedId && onSchemeSelect) {
      onSchemeSelect(selectedId);
    }
  };

  const selectedScheme = SCHEMES.find((s) => s.id === selectedId);

  return (
    <div className={`card ${styles.selectorCard}`}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="scheme-select" className="sr-only">
            Select a scheme
          </label>
          <div className={styles.selectWrapper}>
            <select
              id="scheme-select"
              value={selectedId}
              onChange={handleSelect}
              className={styles.select}
              disabled={isLoading}
            >
              <option value="" disabled>
                — Select a scheme —
              </option>
              {SCHEMES.map((scheme) => (
                <option key={scheme.id} value={scheme.id}>
                  {scheme.name} ({scheme.department})
                </option>
              ))}
            </select>
          </div>
        </div>

        {selectedScheme && (
          <div className={styles.badges}>
            <span className="badge">State: {selectedScheme.state}</span>
            <span className="badge badge--accent">Category: {selectedScheme.category}</span>
          </div>
        )}

        <button
          type="submit"
          className="btn-primary"
          disabled={!selectedId || isLoading}
          aria-busy={isLoading}
        >
          {isLoading ? 'Fetching details...' : 'Get Details'}
        </button>
      </form>
      <p className={styles.helperText}>
        Data fetched from official Karnataka portals.
      </p>
    </div>
  );
}
