import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const styles: Record<string, React.CSSProperties> = {
    shell: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: '#FAF9F6',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 24px',
        borderBottom: '1px solid #DAD5C8',
        position: 'relative',
    },
    wordmark: {
        fontFamily: "Georgia, 'Iowan Old Style', serif",
        fontSize: 20,
        fontWeight: 600,
        color: '#1B2430',
        textDecoration: 'none',
        letterSpacing: '-0.01em',
    },
    navLink: {
        fontSize: 14,
        color: '#6B7280',
        textDecoration: 'none',
        paddingBottom: 4,
        borderBottom: '2px solid transparent',
    },
    navLinkActive: {
        color: '#1B2430',
        borderBottom: '2px solid #B08D2B',
    },
    toggleButton: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 4,
        
        flexDirection: 'column',
        gap: 5,
    },
    toggleBar: {
        width: 22,
        height: 2,
        background: '#1B2430',
        borderRadius: 1,
    },
    mobileMenu: {
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        background: '#FAF9F6',
        borderBottom: '1px solid #DAD5C8',
        padding: '12px 24px 20px',
        gap: 16,
        zIndex: 10,
    },
    mobileNavLink: {
        fontSize: 15,
        color: '#4B5563',
        textDecoration: 'none',
        padding: '10px 0',
        borderBottom: '1px solid #EDEAE0',
    },
    main: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
}

const NAV_ITEMS = [
    { to: '/', label: 'Home' },
    { to: '/questions', label: 'Start' },
    { to: '/result', label: 'Result' },
    { to: '/negotiation', label: 'Negotiation' },
]

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { pathname } = useLocation()
    const [menuOpen, setMenuOpen] = useState(false)

    // Close the mobile menu whenever the route changes.
    React.useEffect(() => {
        setMenuOpen(false)
    }, [pathname])

    return (
        <div style={styles.shell}>
            <header style={styles.header}>
                <Link to="/" style={styles.wordmark}>Borrower Copilot</Link>

                <nav className="nav-desktop">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.to}
                            to={item.to}
                            style={{
                                ...styles.navLink,
                                ...(pathname === item.to ? styles.navLinkActive : {}),
                            }}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <button
                    type="button"
                    className="nav-toggle"
                    style={styles.toggleButton}
                    aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen((v) => !v)}
                >
                    <span
                        style={{
                            ...styles.toggleBar,
                            transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none',
                        }}
                    />
                    <span style={{ ...styles.toggleBar, opacity: menuOpen ? 0 : 1 }} />
                    <span
                        style={{
                            ...styles.toggleBar,
                            transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none',
                        }}
                    />
                </button>

                <nav
                    className={`nav-mobile-menu${menuOpen ? ' open' : ''}`}
                    style={styles.mobileMenu}
                >
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.to}
                            to={item.to}
                            style={{
                                ...styles.mobileNavLink,
                                ...(pathname === item.to ? { color: '#1B2430', fontWeight: 600 } : {}),
                            }}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </header>
            <main style={styles.main}>{children}</main>
        </div>
    )
}

export default Layout