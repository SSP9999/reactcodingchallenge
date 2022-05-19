import {Routes, Route} from 'react-router-dom';
import Chart from './pages/charts';
import Register from './pages/register';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Register/>}/>
        <Route path='chart' element={<Chart/>}/>
      </Routes>
    </div>
  );
}

export default App;
