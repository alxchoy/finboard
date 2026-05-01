import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const Analytics = lazy(() => import('analytics/Analytics'));
const Market = lazy(() => import('market/Market'));
const Portfolio = lazy(() => import('portfolio/Portfolio'));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense>
        <Routes>
          <Route path="analytics" element={<Analytics />} />
          <Route path="market" element={<Market />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="/" element={<Navigate to="/portfolio" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
