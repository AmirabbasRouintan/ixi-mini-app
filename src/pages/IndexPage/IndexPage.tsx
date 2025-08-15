import React, { useEffect } from 'react';
import type { FC } from 'react';

// --- Components (Styled for a Golden Glassy Design) ---

const Page: FC<{ children: React.ReactNode }> = ({ children }) => (
    <div style={{
        padding: '16px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        minHeight: '100vh',
        color: 'var(--tg-theme-text-color, #ffffff)',
        position: 'relative', // Needed for content to appear above the fixed background
        zIndex: 1,
    }}>
        {children}
    </div>
);

const Link: FC<{ children: React.ReactNode; to: string; style?: React.CSSProperties }> = ({ children, to, style }) => (
    <a href={to} style={{ ...style, textDecoration: 'none', color: 'inherit' }}>
        {children}
    </a>
);

const Section: FC<{ children: React.ReactNode }> = ({ children }) => (
    <div style={{
        // Enhanced Glassmorphism effect for sections
        backgroundColor: 'var(--tg-theme-section-bg-color, rgba(30, 30, 30, 0.5))',
        backdropFilter: 'blur(30px) saturate(200%)',
        WebkitBackdropFilter: 'blur(30px) saturate(200%)', // For Safari support

        border: '1px solid var(--tg-theme-border-color, rgba(255, 215, 0, 0.2))', // Subtle golden border
        borderRadius: '24px',
        marginBottom: '1.5rem',
        overflow: 'hidden',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)', // Deeper shadow for more depth
    }}>
        {children}
    </div>
);

// --- App Structure ---

/**
 * A simplified Navbar with the updated modern look.
 */
const AppNavbar: FC = () => {
    return (
        <Section>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 20px'
            }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ color: 'var(--tg-theme-golden-color, #FFD700)' }}
                    >
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                    <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Mini App</span>
                </Link>
            </div>
        </Section>
    );
};

/**
 * Main Page Component.
 */
export const IndexPage: FC = () => {
    return (
        <Page>
            <AppNavbar />
            <Section>
                <div style={{ padding: '50px 25px', textAlign: 'center' }}>
                    <h2 style={{ margin: '0 0 10px 0', fontSize: '2rem', fontWeight: '600', color: 'var(--tg-theme-golden-color, #FFD700)'}}>Welcome</h2>
                    <p style={{
                        margin: 0,
                        color: 'var(--tg-theme-hint-color, #dddddd)',
                        lineHeight: '1.6'
                    }}>
                        Your modern page content goes here.
                    </p>
                </div>
            </Section>
        </Page>
    );
};

// --- App Wrapper ---
// This component sets up the global styles and the blurred background effect.
function App() {
    useEffect(() => {
        // Define the new golden color palette
        const styles = {
            '--tg-theme-bg-color': '#000000',
            '--tg-theme-section-bg-color': 'rgba(30, 30, 30, 0.5)', // Darker semi-transparent
            '--tg-theme-text-color': '#ffffff',
            '--tg-theme-hint-color': '#dddddd', // Brighter hint text
            '--tg-theme-border-color': 'rgba(255, 215, 0, 0.2)', // Subtle golden border
            '--tg-theme-golden-color': '#FFD700', // Main golden color
        };

        // Apply the base background color
        document.body.style.backgroundColor = styles['--tg-theme-bg-color'];
        document.body.style.overflow = 'hidden'; // Prevent body scrollbars from interfering with the background

        // Apply CSS variables to the root element
        for (const [key, value] of Object.entries(styles)) {
            document.documentElement.style.setProperty(key, value);
        }

        // --- Create the blurred, animated golden background ---
        const styleTag = document.createElement('style');
        styleTag.innerHTML = `
          body::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: 0;
            pointer-events: none;
            background:
              radial-gradient(ellipse at 70% 80%, #FFD700, transparent 50%),
              radial-gradient(ellipse at 30% 20%, #FFA500, transparent 50%);
            background-size: 150% 150%;
            animation: moveLivelyGradient 20s ease infinite alternate;
            filter: blur(120px); /* Increased blur for a softer effect */
            opacity: 0.6; /* Soften the overall effect */
          }

          @keyframes moveLivelyGradient {
            0% { transform: rotate(0deg) scale(1.2); background-position: 0% 50%; }
            100% { transform: rotate(360deg) scale(1.2); background-position: 100% 50%; }
          }
        `;
        document.head.appendChild(styleTag);

        // Cleanup the style tag when the component unmounts
        return () => {
            document.head.removeChild(styleTag);
            document.body.style.overflow = 'auto';
        };
    }, []);

    return <IndexPage />;
}

export default App;
