import React from 'react'
import { buildProfile } from "../domain/borrower/data"
import { questions } from "../domain/questions/data"
import { answers } from "../domain/QuestionAnswer/data"
import { decisionEngine } from '../domain/rules/decisionEngine'
import { getAdaptiveQuestions } from '../domain/borrower/data'
import {useNavigate} from "react-router-dom"
type FairRate = {
    min: number
    max: number
}

type Decision = {
    verdict: string
    reasons: string[]
    safeEmi: number
    borrowerMax: number
    lenderMax?: number
    fairRate?: FairRate
}

const inr = (n?: number) =>
    n === undefined ? '—' : '₹' + Math.round(n).toLocaleString('en-IN')

type VerdictCopy = {
    heading: string
    color: string
}

const VERDICT_COPY: Record<string, VerdictCopy> = {
    BORROW: { heading: "You're clear to borrow", color: '#2F6D4F' },
    APPROVE: { heading: "You're clear to borrow", color: '#2F6D4F' },
    DECLINE: { heading: "This isn't affordable right now", color: '#A23B2E' },
    REJECT: { heading: "This isn't affordable right now", color: '#A23B2E' },
    REVIEW: { heading: 'This needs a closer look', color: '#9A7B1D' },
}

const styles: Record<string, React.CSSProperties> = {
    page: {
        maxWidth: 640,
        margin: '0 auto',
        padding: '48px 24px 64px',
        background: '#FAF9F6',
        color: '#1B2430',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    },
    eyebrow: {
        fontSize: 14,
        color: '#6B7280',
        margin: '0 0 8px',
    },
    headline: {
        fontFamily: "Georgia, 'Iowan Old Style', serif",
        fontSize: 32,
        lineHeight: 1.25,
        fontWeight: 600,
        margin: '0 0 12px',
    },
    reason: {
        fontSize: 16,
        lineHeight: 1.6,
        color: '#4B5563',
        margin: 0,
        maxWidth: 480,
    },
    sectionLabel: {
        fontSize: 13,
        color: '#6B7280',
        margin: '48px 0 4px',
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        padding: '18px 0',
        borderTop: '1px solid #DAD5C8',
    },
    rowLabel: {
        fontSize: 15,
        color: '#4B5563',
    },
    rowValue: {
        fontSize: 17,
        fontVariantNumeric: 'tabular-nums',
        fontWeight: 600,
        color: '#1B2430',
    },
    barWrap: {
        margin: '32px 0 8px',
    },
    barTrack: {
        position: 'relative',
        height: 8,
        background: '#EDEAE0',
        borderRadius: 4,
        overflow: 'hidden',
    },
    barCaption: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 13,
        color: '#6B7280',
        marginTop: 8,
    },
    reasonsBlock: {
        borderLeft: '2px solid #DAD5C8',
        paddingLeft: 20,
        marginTop: 16,
    },
    reasonLine: {
        fontSize: 15,
        lineHeight: 1.7,
        color: '#374151',
        margin: '0 0 10px',
    },
    empty: {
        fontSize: 15,
        color: '#6B7280',
        padding: '48px 0',
    },
    negotiateButton: {
        display: 'inline-block',
        marginTop: 32,
        padding: '12px 24px',
        fontSize: 15,
        fontWeight: 600,
        color: '#FAF9F6',
        background: '#B08D2B',
        border: 'none',
        borderRadius: 4,
        cursor: 'pointer',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        transition: 'background 0.15s ease',
    },
}

const Result: React.FC = () => {
    const profile = buildProfile(questions, answers)
    const decision: Decision | undefined = decisionEngine(profile)

    console.log("Borrower Profile:", JSON.stringify(profile, null, 2))
    console.log("DECISIONS FOR BORROWER", JSON.stringify(decision, null, 2))
    const adaptiveQuestions =getAdaptiveQuestions(profile,answers,questions)
    console.log(adaptiveQuestions)

    const navigator = useNavigate()


    if (!decision) {
        return (
            <div style={styles.page}>
                <p style={styles.empty}>
                    Couldn't work out a decision from the answers given. Check the
                    borrower profile and try again.
                </p>
            </div>
        )
    }

    const {
        verdict,
        reasons = [],
        safeEmi,
        borrowerMax,
        lenderMax,
        fairRate,
    } = decision

    const copy: VerdictCopy = VERDICT_COPY[verdict] || {
        heading: verdict,
        color: '#1B2430',
    }

    const maxOfTwo = Math.max(borrowerMax || 0, lenderMax || 0) || 1
    const borrowerPct = ((borrowerMax || 0) / maxOfTwo) * 100
    const lenderPct = ((lenderMax || 0) / maxOfTwo) * 100

    return (
        
        <div style={styles.page}>

            
            <p style={styles.eyebrow}>Loan affordability check</p>
            <h1 style={{ ...styles.headline, color: copy.color }}>
                {copy.heading}
            </h1>
            {reasons[0] && <p style={styles.reason}>{reasons[0]}</p>}

            <p style={styles.sectionLabel}>The numbers</p>
            <div>
                <div style={styles.row}>
                    <span style={styles.rowLabel}>Safe monthly EMI</span>
                    <span style={styles.rowValue}>{inr(safeEmi)} / month</span>
                </div>
                <div style={styles.row}>
                    <span style={styles.rowLabel}>What you can safely borrow</span>
                    <span style={styles.rowValue}>{inr(borrowerMax)}</span>
                </div>
                <div style={styles.row}>
                    <span style={styles.rowLabel}>What the lender could offer</span>
                    <span style={styles.rowValue}>{inr(lenderMax)}</span>
                </div>
                <div style={{ ...styles.row, borderBottom: '1px solid #DAD5C8' }}>
                    <span style={styles.rowLabel}>Fair interest rate range</span>
                    <span style={styles.rowValue}>
                        {fairRate ? `${fairRate.min}% – ${fairRate.max}%` : '—'}
                    </span>
                </div>
            </div>

            {lenderMax !== undefined && (
                <div style={styles.barWrap}>
                    <div style={styles.barTrack}>
                        <div
                            style={{
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                bottom: 0,
                                width: `${lenderPct}%`,
                                background: '#DAD5C8',
                            }}
                        />
                        <div
                            style={{
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                bottom: 0,
                                width: `${borrowerPct}%`,
                                background: '#B08D2B',
                            }}
                        />
                    </div>
                    <div style={styles.barCaption}>
                        <span>Safe for you: {inr(borrowerMax)}</span>
                        <span>Lender's ceiling: {inr(lenderMax)}</span>
                    </div>
                </div>
            )}
<button
    style={styles.negotiateButton}
    onMouseOver={(e) => (e.currentTarget.style.background = '#9A7B1D')}
    onMouseOut={(e) => (e.currentTarget.style.background = '#B08D2B')}
    onClick={() => navigator("/negotiationcard")}
>
    Go to Negotiation Card
</button>
            {reasons.length > 0 && (
                <>
                    <p style={styles.sectionLabel}>Why</p>
                    <div style={styles.reasonsBlock}>
                        {reasons.map((r, i) => (
                            <p key={i} style={styles.reasonLine}>{r}</p>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default Result