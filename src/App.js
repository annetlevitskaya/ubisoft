import './App.css';
import './reset.css';
import Header from './components/Header/Header.js';
import PlayList from './components/PlayList/PlayList.js';

function App() {
  return (
    <div className="App">
      <Header />
      <PlayList />
    </div>
  );
}

export default App;
