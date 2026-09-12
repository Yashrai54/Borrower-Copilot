import React from 'react'
import { useNavigate } from 'react-router-dom'

const styles: Record<string, React.CSSProperties> = {
    hero: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 'clamp(48px, 10vh, 80px) 24px 60px',
        maxWidth: 720,
        margin: '0 auto',
    },
    eyebrow: {
        fontSize: 14,
        color: '#6B7280',
        margin: '0 0 16px',
    },
    headline: {
        fontFamily: "Georgia, 'Iowan Old Style', serif",
        fontSize: 'clamp(28px, 6vw, 44px)',
        lineHeight: 1.2,
        fontWeight: 600,
        margin: '0 0 20px',
        color: '#1B2430',
    },
    sub: {
        fontSize: 'clamp(15px, 3vw, 17px)',
        lineHeight: 1.6,
        color: '#4B5563',
        maxWidth: 480,
        margin: '0 0 36px',
    },
    cta: {
        padding: '14px 32px',
        fontSize: 16,
        fontWeight: 600,
        color: '#FAF9F6',
        background: '#B08D2B',
        border: 'none',
        borderRadius: 4,
        cursor: 'pointer',
        fontFamily: 'inherit',
        width: '100%',
        maxWidth: 320,
    },
    stepsWrap: {
        borderTop: '1px solid #DAD5C8',
        padding: '48px 24px 64px',
        maxWidth: 900,
        margin: '0 auto',
        width: '100%',
    },
    step: {
        flex: 1,
        padding: '0 28px',
        textAlign: 'left',
    },
    stepTitle: {
        fontSize: 15,
        fontWeight: 600,
        color: '#1B2430',
        margin: '0 0 8px',
    },
    stepBody: {
        fontSize: 14,
        lineHeight: 1.6,
        color: '#6B7280',
        margin: 0,
    },
}

const Home: React.FC = () => {
    const navigate = useNavigate()

    return (
        <>
            <div style={styles.hero}>
                <p style={styles.eyebrow}>Before you sign for a loan</p>
                <h1 style={styles.headline}>Know what you can safely borrow</h1>
                <p style={styles.sub}>
                    Answer a few questions about your income and finances.
                    Get a clear verdict, a safe EMI, and a fair rate range —
                    benchmarked against real lender data.
                </p>
                <button
                    type="button"
                    style={styles.cta}
                    onClick={() => navigate('/questions')}
                >
                    Check my borrowing capacity
                </button>
            </div>

            <div style={styles.stepsWrap}>
                <div className="steps-row">
                    <div className="step-col" style={styles.step}>
                        <p style={styles.stepTitle}>1. Answer a few questions</p>
                        <p style={styles.stepBody}>
                            Income, existing debt, and a few adaptive questions
                            based on your situation.
                        </p>
                    </div>
                    <div className="step-col" style={styles.step}>
                        <p style={styles.stepTitle}>2. Get your verdict</p>
                        <p style={styles.stepBody}>
                            Borrow, borrow less, or don't borrow — with the
                            reasoning behind it, not just a number.
                        </p>
                    </div>
                    <div className="step-col" style={styles.step}>
                        <p style={styles.stepTitle}>3. Negotiate with confidence</p>
                        <p style={styles.stepBody}>
                            A fair rate range and concrete talking points for
                            your lender conversation.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home