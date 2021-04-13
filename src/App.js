import { Route } from 'react-router';
import Decode from './pages/Decode';
import Encode from './pages/Encode';
import Home from './pages/Home';

function App() {
  return (
    <>
      <Route path="//" component={Home}/>
      <Route path="/encode" component={Encode}/>
      <Route path="/decode" component={Decode}/>
    </>
  );
}

export default App;
