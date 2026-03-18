export default function Home() {
  return (
    <>
      <nav aria-label="Main navigation">
        <a href="#main-content" className="sr-only">Skip to main content</a>
      </nav>
      
      <main id="main-content" data-testid="hero" className="hero">
        <h1 className="hero-headline">Hello World</h1>
        <p className="hero-subheadline">
          Building the future of minimalist design with clean typography
        </p>
        <a href="/get-started" className="cta-button" data-testid="cta-button">
          Get Started
        </a>
      </main>
      
      <footer role="contentinfo" data-testid="copyright">
        <p>&copy; 2026 Dream Maker Company. All rights reserved.</p>
      </footer>
    </>
  );
}
