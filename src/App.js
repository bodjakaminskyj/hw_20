import './App.css';
import Timer from './components/timer';


function App() {
  return (
    <div className="App">
      <Timer time = {61000}    step={1000} />
    </div>
  );
}

export default App;
