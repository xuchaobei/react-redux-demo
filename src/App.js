// import ArticleList from './components/ArticleList';
// import Clock from './components/Clock';
import AddPostForm from './components/AddPostForm';

const articles = [
  { id: 1, title: 'Article 1' },
  { id: 2, title: 'Article 2' },
  { id: 3, title: 'Article 3' },
];

function App() {
  return (
    <div>
      <AddPostForm />
    </div>
  )

}

export default App;
