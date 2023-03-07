import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

import "./app.css";
const App = () => {
  const [quote, setQuote] = useState({});
  useEffect(() => {
    getRandomQuote();
  }, []);

  const getResourse = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, reseived ${res.status}`);
    }
    return await res.json();
  };

  const getQuote = async () => {
    return await getResourse(
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
    );
  };

  const getRandomQuote = () => {
    const id = Math.floor(Math.random() * 100) + 2;
    getQuote().then((data) => setQuote(data.quotes[id]));
  };

  return (
    <div id="quote-box">
      <div id="text">
        <p className="quote">{quote.quote}</p>
        <p id="author">{quote.author}</p>
      </div>

      <div className="buttons">
        <a id="tweet-quote" href="twitter.com/intent/tweet" target="_blank">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <button id="new-quote" onClick={getRandomQuote}>
          New Quote
        </button>
      </div>
    </div>
  );
};

export default App;
