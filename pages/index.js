import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/results?q=${encodeURIComponent(query)}`);
    }
  };

  const slashtags = ['/news', '/tech', '/images', '/videos'];

  return (
    <div style={styles.container}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/a/a7/Blekko_Logo.svg"
        alt="Blekko Logo"
        style={styles.logo}
      />
      <form onSubmit={handleSearch} style={styles.form}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search the web..."
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Search
        </button>
      </form>
      <div style={styles.slashtags}>
        {slashtags.map((tag) => (
          <span
            key={tag}
            style={styles.tag}
            onClick={() => router.push(`/results?q=${encodeURIComponent(tag)}`)}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    fontFamily: 'Verdana, sans-serif',
    marginTop: '100px',
  },
  logo: {
    width: '220px',
    marginBottom: '30px',
  },
  form: {
    display: 'inline-flex',
  },
  input: {
    padding: '12px',
    width: '400px',
    fontSize: '16px',
    border: '2px solid #ccc',
    borderRadius: '4px 0 0 4px',
    outline: 'none',
  },
  button: {
    padding: '12px 20px',
    fontSize: '16px',
    backgroundColor: '#FF6600',
    color: 'white',
    border: 'none',
    borderRadius: '0 4px 4px 0',
    cursor: 'pointer',
  },
  slashtags: {
    marginTop: '20px',
  },
  tag: {
    display: 'inline-block',
    backgroundColor: '#f2f2f2',
    padding: '5px 10px',
    margin: '0 5px',
    borderRadius: '3px',
    fontSize: '14px',
    cursor: 'pointer',
  },
};
