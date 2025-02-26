import { useClerkToken } from './lib/clerk/hooks/useClerkToken';
import Router from './routes/Router';

function App() {
  useClerkToken();
  return <Router />;
}

export default App;
