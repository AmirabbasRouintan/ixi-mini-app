import React, { useEffect } from 'react';
import type { FC } from 'react';

import alarmClockImage from './clock.png';
import todoListImage from './todo.png';

const Page: FC<{ children: React.ReactNode }> = ({ children }) => (
    <div style={{
        padding: '16px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        minHeight: '100vh',
        color: 'var(--tg-theme-text-color, #D5E1D2)',
        position: 'relative',
        zIndex: 1,
    }}>
        {children}
    </div>
);

export const IndexPage: FC = () => {
    const cardStyle: React.CSSProperties = {
        width: '95%',
        maxWidth: '550px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.5rem',
        padding: '1.5rem 2rem',
    };

    const iconImageStyle: React.CSSProperties = {
        width: '56px',
        height: '56px',
        flexShrink: 0,
        objectFit: 'contain',
    };
    
    const titleStyle: React.CSSProperties = {
        margin: '0 0 8px 0',
        fontSize: '1.2rem',
        fontWeight: 600,
        color: '#FFFFFF',
        textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
    };
    
    const descriptionStyle: React.CSSProperties = {
        margin: 0,
        color: '#EAEAEA',
        fontSize: '0.95rem',
        lineHeight: '1.5',
    };

    const separatorStyle: React.CSSProperties = {
        width: '95%',
        maxWidth: '550px',
        height: '1px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    };

    return (
        <Page>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.5rem',
                paddingTop: '1rem', // Added some padding to the top for spacing
            }}>

                <div style={cardStyle}>
                    <div>
                        <h3 style={titleStyle}>Timer</h3>
                        <p style={descriptionStyle}>
                            Manage your time effectively. Set, start, and stop a timer with ease.
                        </p>
                    </div>
                    <img src={alarmClockImage} alt="Alarm Clock" style={iconImageStyle} />
                </div>

                <div style={separatorStyle}></div>

                <div style={cardStyle}>
                    <div>
                        <h3 style={titleStyle}>TODO List</h3>
                        <p style={descriptionStyle}>
                            Organize your tasks and boost productivity with a clean to-do list.
                        </p>
                    </div>
                    <img src={todoListImage} alt="TODO List" style={iconImageStyle} />
                </div>

            </div>
        </Page>
    );
};

function App() {
    useEffect(() => {
        const styles = {
            '--tg-theme-bg-color': '#000000',
            '--tg-theme-section-bg-color': 'rgba(29, 57, 48, 0.5)', 
            '--tg-theme-text-color': '#D5E1D2',
            '--tg-theme-hint-color': '#87AB8F',
            '--tg-theme-border-color': 'rgba(74, 114, 94, 0.2)',
            '--tg-theme-accent-color': '#4A725E',
        };

        document.body.style.backgroundColor = styles['--tg-theme-bg-color'];
        
        for (const [key, value] of Object.entries(styles)) {
            document.documentElement.style.setProperty(key, value);
        }

    }, []);

    return <IndexPage />;
}

export default App;