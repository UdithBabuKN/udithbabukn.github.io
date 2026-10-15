import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import ShelbyPortfolio from './components/ShelbyPortfolio';
import './shelbyStyle.css';

function App() {
  useEffect(() => {
    updateDates();
  }, []);

  return (
    <>
      <Helmet>
        <title>Udith Babu K N | Marketing &amp; Sales Executive | IT Business Analyst</title>
        <meta 
          name="description" 
          content="Portfolio of Udith Babu K N, a Marketing &amp; Sales Executive and IT Business Analyst from Kerala, India, skilled in data-driven strategy and technical SEO." 
        />
        <meta property="og:title" content="Udith Babu K N | Marketing &amp; Sales Executive | IT Business Analyst" />
        <meta property="og:url" content="https://udithbabukn.github.io/" />
      </Helmet>

      <ShelbyPortfolio />
    </>
  );
}

function updateDates() {
  const currentDate = new Date().toISOString().split('T')[0];
  const schemaDataElement = document.getElementById('schema-data');
  if (schemaDataElement) {
    try {
      const schemaData = JSON.parse(schemaDataElement.textContent);
      schemaData.dateModified = currentDate;
      schemaDataElement.textContent = JSON.stringify(schemaData, null, 4);
    } catch (e) {
      console.error("Could not parse or update schema data:", e);
    }
  }
}

export default App;
