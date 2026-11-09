import { lazy, Suspense } from 'react';
import { Navbar } from './components/layout/Navbar';
import { SmoothScroll } from './components/common/SmoothScroll';

// Lazy loading content sections for performance optimization & code-splitting
const Hero = lazy(() => import('./components/sections/Hero'));
const Work = lazy(() => import('./components/sections/Work'));
const About = lazy(() => import('./components/sections/About'));
const Experience = lazy(() => import('./components/sections/Experience'));
const Skills = lazy(() => import('./components/sections/Skills'));
const Contact = lazy(() => import('./components/sections/Contact'));
const Footer = lazy(() => import('./components/layout/Footer/Footer'));

// Section Loading Skeleton Fallback
const SectionSkeleton = () => (
  <div className="mx-auto max-w-7xl px-4 py-14 sm:py-16 lg:py-20 animate-pulse">
    <div className="h-4 w-28 rounded-full bg-neutral-200 mb-4"></div>
    <div className="h-8 w-64 rounded-xl bg-neutral-200 mb-8"></div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="h-56 rounded-3xl bg-neutral-100"></div>
      <div className="h-56 rounded-3xl bg-neutral-100"></div>
      <div className="h-56 rounded-3xl bg-neutral-100"></div>
    </div>
  </div>
);

const App = () => {
  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#FAFAFA] text-neutral-900 selection:bg-[#3B5BFF]/15 selection:text-[#3B5BFF] flex flex-col font-cabinet">
        {/* High-performance Navbar combining React Bits & Emergent Themes */}
        <Navbar />

        {/* Main Content Sections with Lazy Loading & Suspense */}
        <main className="flex-1">
          <Suspense fallback={<SectionSkeleton />}>
            <Hero />
          </Suspense>

          <Suspense fallback={<SectionSkeleton />}>
            <Work />
          </Suspense>

          <Suspense fallback={<SectionSkeleton />}>
            <About />
          </Suspense>

          <Suspense fallback={<SectionSkeleton />}>
            <Experience />
          </Suspense>

          <Suspense fallback={<SectionSkeleton />}>
            <Skills />
          </Suspense>

          <Suspense fallback={<SectionSkeleton />}>
            <Contact />
          </Suspense>
        </main>

        {/* Footer */}
        <Suspense fallback={<div className="h-24 bg-neutral-50" />}>
          <Footer />
        </Suspense>
      </div>
    </SmoothScroll>
  );
};

export default App;
