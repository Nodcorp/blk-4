import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';

export default async function handler(req, res) {
  const { q } = req.query;

  if (!q) {
    res.status(400).json({ error: 'No query provided' });
    return;
  }

  try {
    const searchUrl = `https://www.bing.com/search?q=${encodeURIComponent(q)}`;
    const response = await fetch(searchUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/117.0.0.0 Safari/537.36',
      },
    });

    const html = await response.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;

    const results = Array.from(document.querySelectorAll('li.b_algo')).map((item) => ({
      title: item.querySelector('h2')?.textContent || '',
      url: item.querySelector('h2 a')?.href || '',
      snippet: item.querySelector('.b_caption p')?.textContent || '',
    }));

    res.status(200).json({ query: q, results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching Bing search results' });
  }
}
