import {useState, useEffect} from 'react'
import ArticleList from './components/ArticleList';
import { client } from './api/client';
import Clock from './components/Clock';

// const articles = [
//   { id: 1, title: 'Article 1' },
//   { id: 2, title: 'Article 2' },
//   { id: 3, title: 'Article 3' },
// ];

function App() {
  const [articles, setArticles] = useState([])

  useEffect(()=> {
    const fetchArticles = async () => {
      try{
        const response = await client.get('/fakeApi/posts');
        console.log(response)
        setArticles(response.posts);
      }catch(err){
        console.error(err)
      }
    }

    fetchArticles();
  }, [])

  return (
    <div>
      <Clock/>
      <ArticleList articles={articles}/>
    </div>
  )

}

export default App;
