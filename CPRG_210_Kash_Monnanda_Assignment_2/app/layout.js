import Link from 'next/link';
import './globals.css';

export const metadata = {
  title: 'Student Hub | Campus Directory',
  description: 'Meet your campus community and register your student profile.',
};

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="site-shell">
          <header className="site-header">
            <nav className="nav-wrap" aria-label="Main navigation">
              <Link href="/" className="brand" aria-label="Student Hub home">
                <span className="brand-mark" aria-hidden="true">S</span>
                <span className="brand-copy">
                  Student Hub
                  <small>Campus community</small>
                </span>
              </Link>
              <div className="site-nav">
                <Link href="/" className="nav-link">Home</Link>
                <Link href="/student_reg" className="nav-link nav-link-primary">
                  Registration
                </Link>
              </div>
            </nav>
          </header>

          <main className="page-main">{children}</main>

          <footer className="site-footer">
            <span className="footer-brand">Student Hub</span>
            <span>CPRG 210 <span aria-hidden="true">·</span> Assignment 2</span>
          </footer>
        </div>
      </body>
    </html>
  );
}