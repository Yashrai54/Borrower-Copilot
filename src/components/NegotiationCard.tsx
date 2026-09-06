import React from 'react'
import { buildProfile } from "../domain/borrower/data"
import { questions } from "../domain/questions/data"
import { answers } from "../domain/QuestionAnswer/data"
import { decisionEngine } from '../domain/rules/decisionEngine'
import type { BorrowerProfile } from '../domain/borrower/types'

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

const buildNegotiationTips = (
    decision: Decision,
    requested?: number
): string[] => {
    const tips: string[] = []
    const { borrowerMax, lenderMax, safeEmi, fairRate } = decision

    
    if (requested !== undefined && requested > borrowerMax) {
        tips.push(`Ask for a lower loan amount — closer to ${inr(borrowerMax)}`)
    } else {
        tips.push(`Your requested ${requested} is within your calculated safe borrowing limit.`)
    }

    tips.push(
        `Ask the lender for a competitive interest rate within your fair-rate range.`
    )

    tips.push(`Keep the EMI at or below ${inr(safeEmi)}`)

    if (lenderMax !== undefined && lenderMax > borrowerMax) {
        tips.push(
            `The lender may offer up to ${inr(lenderMax)} — don't take more than what's safe for you`
        )
    }

    tips.push('Confirm the processing fee, other applicable charges, total repayment amount, and all-in borrowing cost before accepting the loan.')

    return tips
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
    headline: {
        fontFamily: "Georgia, 'Iowan Old Style', serif",
        fontSize: 26,
        fontWeight: 600,
        margin: '0 0 20px',
        color:"#1B2430"
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        padding: '16px 0',
        borderTop: '1px solid #DAD5C8',
    },
    rowLabel: {
        fontSize: 15,
        color: '#4B5563',
    },
    rowValue: {
        fontSize: 16,
        fontVariantNumeric: 'tabular-nums',
        fontWeight: 600,
        color: '#1B2430',
    },
    requestedValue: {
        fontSize: 16,
        fontVariantNumeric: 'tabular-nums',
        fontWeight: 600,
        color: '#B08D2B',
    },
    sectionLabel: {
        fontSize: 13,
        color: '#6B7280',
        margin: '40px 0 4px',
    },
    list: {
        listStyle: 'none',
        margin: '16px 0 0',
        padding: 0,
    },
    listItem: {
        position: 'relative',
        fontSize: 15,
        lineHeight: 1.6,
        color: '#374151',
        padding: '0 0 14px 20px',
    },
    empty: {
        fontSize: 15,
        color: '#6B7280',
        padding: '48px 0',
    },
}

const NegotiationCard = () => {
    const profile: BorrowerProfile = buildProfile(questions, answers)
    const decision: Decision | undefined = decisionEngine(profile)

    if (!decision) {
        return (
            <div style={styles.page}>
                <p style={styles.empty}>
                    Couldn't work out a negotiation position from the answers given.
                </p>
            </div>
        )
    }

    const requested = profile?.loanRequest?.loanAmount
    const tips = buildNegotiationTips(decision, requested)

    return (
        <div style={styles.page}>
            <h2 style={styles.headline}>Your Borrowing Position</h2>

            <div>
                <div style={{ ...styles.row, borderTop: 'none' }}>
                    <span style={styles.rowLabel}>Requested</span>
                    <span style={styles.requestedValue}>{inr(requested)}</span>
                </div>
                <div style={styles.row}>
                    <span style={styles.rowLabel}>Borrower-safe amount</span>
                    <span style={styles.rowValue}>{inr(decision.borrowerMax)}</span>
                </div>
                <div style={styles.row}>
                    <span style={styles.rowLabel}>Lender-side estimate</span>
                    <span style={styles.rowValue}>{inr(decision.lenderMax)}</span>
                </div>
                <div style={styles.row}>
                    <span style={styles.rowLabel}>Fair rate</span>
                    <span style={styles.rowValue}>
                        {decision.fairRate
                            ? `${decision.fairRate.min}–${decision.fairRate.max}%`
                            : '—'}
                    </span>
                </div>
                <div style={{ ...styles.row, borderBottom: '1px solid #DAD5C8' }}>
                    <span style={styles.rowLabel}>Safe EMI</span>
                    <span style={styles.rowValue}>{inr(decision.safeEmi)}</span>
                </div>
            </div>

            <p style={styles.sectionLabel}>What to negotiate</p>
            <ul style={styles.list}>
                {tips.map((tip, i) => (
                    <li key={i} style={styles.listItem}>
                        <span
                            style={{
                                position: 'absolute',
                                left: 0,
                                top: 8,
                                width: 6,
                                height: 6,
                                borderRadius: '50%',
                                background: '#B08D2B',
                            }}
                        />
                        {tip}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default NegotiationCard