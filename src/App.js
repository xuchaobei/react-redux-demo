import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './features/home';
import Editor from './features/editor';
import Login from './features/login';
import Post from './features/post';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/editor">
            <Editor />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/posts/:id">
            <Post />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
