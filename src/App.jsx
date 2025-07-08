import React from 'react';
import { Router, Route, Switch } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/Home.jsx';
import Help from './pages/Help.jsx';
import Privacy from './pages/Privacy.jsx';
import NotFound from './pages/NotFound.jsx';
import { Toaster } from './components/ui/toaster.jsx';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Router>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/help" component={Help} />
            <Route path="/privacy" component={Privacy} />
            <Route component={NotFound} />
          </Switch>
        </Router>
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;