import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './contexts/AppContext';
import { BootScreen } from './components/BootScreen';
import { TopBar } from './components/TopBar';
import { Footer } from './components/Footer';
import { HomeScreen } from './components/HomeScreen';
import { ProjectsPage } from './components/ProjectsPage';
import { SkillsPage } from './components/SkillsPage';
import { AboutPage } from './components/AboutPage';
import { ResumePage } from './components/ResumePage';
import { ContactPage } from './components/ContactPage';
import { SocialsPage } from './components/SocialsPage';
import { StandardView } from './components/StandardView';
import { useCursorRing } from './hooks/useCursorRing';

function AppInner() {
  const location = useLocation();
  const { standardView } = useApp();
  const [showBoot, setShowBoot] = useState(() => {
    if (location.pathname !== '/') return false;
    try {
      return !sessionStorage.getItem('at-boot-done');
    } catch {
      return true;
    }
  });
  const [entered, setEntered] = useState(!showBoot);

  useCursorRing(!standardView);

  useEffect(() => {
    if (!showBoot && !entered) {
      setEntered(true);
    }
  }, [showBoot, entered]);

  if (standardView) {
    return <StandardView />;
  }

  if (showBoot) {
    return <BootScreen onComplete={() => setShowBoot(false)} />;
  }

  return (
    <>
      <TopBar />
      <Routes>
        <Route path="/" element={<HomeScreen entered={entered} />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/socials" element={<SocialsPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  );
}
