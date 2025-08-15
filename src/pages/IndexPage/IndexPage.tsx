import React, { useState, useEffect } from 'react';

// --- Mock Components ---
// The following components are placeholders to resolve the compilation errors
// and create a runnable example. In your actual application, you would
// import these from '@telegram-apps/telegram-ui' and your project's component library.

const Page = ({ children }) => (
  <div className="bg-gray-100 dark:bg-gray-900 font-sans p-4 min-h-screen transition-colors duration-300">
    <div className="max-w-xl mx-auto">{children}</div>
  </div>
);

const Link = ({ to, children, style }) => (
  <a href={to} style={{ ...style, textDecoration: 'none', color: 'inherit' }}>{children}</a>
);

const Section = ({ header, footer, children }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6 overflow-hidden">
    {header && <h2 className="text-sm font-semibold p-3 bg-gray-50 dark:bg-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600">{header}</h2>}
    <div>{children}</div>
    {footer && <p className="text-xs text-gray-500 dark:text-gray-400 p-3 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">{footer}</p>}
  </div>
);

const List = ({ children }) => <div>{children}</div>;

const Cell = ({ before, subtitle, children }) => (
  <div className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-200 dark:border-gray-600 last:border-b-0">
    {before && <div className="mr-4 flex-shrink-0">{before}</div>}
    <div className="flex-grow">
      <div className="font-medium text-gray-800 dark:text-white">{children}</div>
      {subtitle && <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{subtitle}</div>}
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  </div>
);

const Button = ({ children, size, stretched, onClick, variant = 'primary' }) => {
    const baseClasses = `font-bold rounded-lg transition-colors focus:outline-none focus:ring-2`;
    const sizeClasses = size === 'l' ? 'py-3 px-4 text-base' : 'py-2 px-4 text-sm';
    const stretchClasses = stretched ? 'w-full' : '';
    const variantClasses = {
        primary: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-300',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500 focus:ring-gray-400'
    };

    return (
      <button onClick={onClick} className={`${baseClasses} ${sizeClasses} ${stretchClasses} ${variantClasses[variant]}`}>
        {children}
      </button>
    );
};

const Image = ({ style }) => (
    // Since the original SVG can't be loaded, we'll use a styled placeholder.
    <div style={{...style, width: '44px', height: '44px', borderRadius: '10px' }} className="flex items-center justify-center text-white font-bold text-lg">
      TON
    </div>
);


// --- Main Component ---
// This is the main component for your page, now using the mock components above.

export const IndexPage = ({ toggleTheme, theme }) => {
  return (
    <Page>
      {/* Theme switcher and Navbar */}
      <Section>
        <div className="p-2">
            <Button onClick={toggleTheme} size="m" stretched variant="secondary">
              Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
            </Button>
        </div>
        <div style={{ display: 'flex', gap: '8px', padding: '8px', paddingTop: 0 }}>
          <Link to="/todo" style={{ flexGrow: 1 }}>
            <Button size="l" stretched>
              TODO
            </Button>
          </Link>
          <Link to="/timer" style={{ flexGrow: 1 }}>
            <Button size="l" stretched>
              Timer
            </Button>
          </Link>
        </div>
      </Section>

      {/* Original Page Content */}
      <List>
        <Section
          header="Features"
          footer="You can use these pages to learn more about features, provided by Telegram Mini Apps and other useful projects"
        >
          <Link to="/ton-connect">
            <Cell
              before={<Image style={{ backgroundColor: '#007AFF' }}/>}
              subtitle="Connect your TON wallet"
            >
              TON Connect
            </Cell>
          </Link>
        </Section>
        <Section
          header="Application Launch Data"
          footer="These pages help developer to learn more about current launch information"
        >
          <Link to="/init-data">
            <Cell subtitle="User data, chat information, technical data">Init Data</Cell>
          </Link>
          <Link to="/launch-params">
            <Cell subtitle="Platform identifier, Mini Apps version, etc.">Launch Parameters</Cell>
          </Link>
          <Link to="/theme-params">
            <Cell subtitle="Telegram application palette information">Theme Parameters</Cell>
          </Link>
        </Section>
      </List>
    </Page>
  );
};

// --- App Wrapper for Rendering ---
// This default export helps render the component in a preview environment.
export default function App() {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        // Add Tailwind CSS for styling the mock components
        const tailwindScriptId = 'tailwind-script';
        if (!document.getElementById(tailwindScriptId)) {
            const tailwindScript = document.createElement('script');
            tailwindScript.id = tailwindScriptId;
            tailwindScript.src = 'https://cdn.tailwindcss.com';
            document.head.appendChild(tailwindScript);
        }
    }, []);

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    return <IndexPage toggleTheme={toggleTheme} theme={theme} />;
}
