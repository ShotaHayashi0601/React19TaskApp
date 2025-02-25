import { useClerkToken } from './lib/clerk/useClerkToken';
import Router from './routes/Router';

function App() {
  useClerkToken();
  return <Router />;
}

export default App;
