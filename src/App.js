import ArticleList from './components/ArticleList';

const articles = [
  { id: 1, title: 'Article 1' },
  { id: 2, title: 'Article 2' },
  { id: 3, title: 'Article 3' },
];

function App() {
  return <ArticleList articles={articles} />;
}

export default App;
