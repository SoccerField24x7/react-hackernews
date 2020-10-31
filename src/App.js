import React, { useState, useEffect } from 'react';

const App = () => {
    // state
    const [news, setNews] = useState([]);
    const [searchQuery, setSearchQuery] = useState('react');
    const [url, setUrl] = useState('http://hn.algolia.com/api/v1/search?query=react');
    const [loading, setLoading] = useState(false);

    // fetch news
    const fetchNews = () => {
        // set loading to true
        setLoading(true);
        
        fetch(url)
            .then((result) => result.json())
            .then((data) => (setNews(data.hits), setLoading(false)))
            .catch((error) => console.log(error));
    }

    useEffect(() => {
        fetchNews();
    }, [url]);

    const handleChange = (e) => {
        console.log(e.target.value);
        setSearchQuery(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setUrl(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`);
    };

    const showLoading = () => {
        return loading ? <h2>Loading...</h2> : '';
    };

    const searchForm = () => (
        <form onSubmit={handleSubmit}>
            <input type="text" value={searchQuery} onChange={handleChange}></input>
            <button>Search</button>
        </form>
    );

    const showNews = () => (
        news.map((n, i) => {
            return <p key={i}><a target="_news" href={n.url}>{n.title}</a></p>
        })
    );

    return (
        <div>
            <h2>News</h2>
            { showLoading() }

            { searchForm() }
            
            { showNews() }
        </div>
    )
}

export default App;
