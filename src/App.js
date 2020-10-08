import React, { useState, useEffect } from 'react';

const App = () => {
    //state
    const [news, setNews] = useState([]);

    // fetch news
    const fetchNews = () => {
        fetch('http://hn.algolia.com/api/v1/search?query=react')
            .then(result => result.json())
            .then(data => setNews(data.hits))
            .catch(error => console.log(error));
    }

    useEffect(() => {
        fetchNews();
    });

    return (
        <div>
            <h2>News</h2>
            {news.map((n, i) => {
                return <p key={i}>{n.title}</p>
            })}
        </div>
    )
}

export default App;
