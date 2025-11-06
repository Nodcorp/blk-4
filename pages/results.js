import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Results() {
  const router = useRouter();
  const { q } = router.query;
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!q) return;

    fetch(`/api/proxy?q=${encodeURIComponent(q)}`)
      .then((res) => res.json())
      .then((data) => setResults(data.results || []))
      .catch(console.error);
  }, [q]);

  const slashtags = ['/news', '/tech', '/images', '/videos'];

  return (
    <div style={styles.container}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/a/a7/Blekko_Logo.svg"
        alt="Blekko Logo"
        style={styles.logo}
      />
      <div style={styles.query}>Search results for: <strong>{q}</strong></div>

      <div style={styles.slashtags}>
        {slashtags.map((tag) => (
          <span
            key={tag}
            style={styles.tag}
            onClick={() => window.location.href = `/results?q=${encodeURIComponent(tag)}`}
          >
            {tag}
          </span>
        ))}
      </div>

      <div style={styles.results}>
        {results.map((r, i) => (
          <div key={i} style={styles.result}>
            <a href={r.url} style={styles.title}>{r.title}</a>
            <div style={styles.url}>{r.url}</div>
            <p style={styles.snippet}>{r.snippet}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Verdana, sans-serif',
    margin: '50px auto',
    maxWidth: '800px',
  },
  logo: {
    width: '180px',
    marginBottom: '20px',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  query: {
    marginTop: '10px',
    fontSize: '18px',
    textAlign: 'center',
  },
  slashtags: {
    marginTop: '20px',
    textAlign: 'center',
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
  results: {
    marginTop: '30px',
  },
  result: {
    borderBottom: '1px solid #ccc',
    paddingBottom: '15px',
    marginBottom: '15px',
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1a0dab',
    textDecoration: 'none',
  },
  url: {
    color: '#006621',
    fontSize: '14px',
    marginBottom: '5px',
  },
  snippet: {
    fontSize: '16px',
  },
};
