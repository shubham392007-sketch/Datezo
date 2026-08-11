import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PredictionProvider } from './hooks/usePrediction';

import { Home } from './pages/Home';
import { Predict } from './pages/Predict';
import { Result } from './pages/Result';
import { Insights } from './pages/Insights';
import { Blog } from './pages/Blog';
import { ArticleDetail } from './pages/ArticleDetail';
import { Chat } from './pages/Chat';
import { About } from './pages/About';
import { NotFound } from './pages/NotFound';

export function App() {
  return (
    <PredictionProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/predict" element={<Predict />} />
          <Route path="/result" element={<Result />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<ArticleDetail />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </PredictionProvider>
  );
}

export default App;
