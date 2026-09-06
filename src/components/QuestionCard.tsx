import React, { useState, useEffect } from 'react'
import type { Question } from '../domain/questions/types'
import type { Answer } from '../domain/QuestionAnswer/types'
import { questions as allQuestions } from '../domain/questions/data'
import { buildProfile, getAdaptiveQuestions } from '../domain/borrower/data'

type AnswerValue = string | number | boolean

type QuestionCardProps = {
    questions?: Question[]
    onComplete: (answers: Answer[]) => void
}

const styles: Record<string, React.CSSProperties> = {
    page: {
        maxWidth: 560,
        margin: '0 auto',
        padding: '48px 24px 64px',
        background: '#FAF9F6',
        color: '#1B2430',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    },
    progressTrack: {
        height: 4,
        background: '#EDEAE0',
        borderRadius: 2,
        overflow: 'hidden',
        marginBottom: 12,
    },
    progressFill: {
        height: '100%',
        background: '#B08D2B',
        transition: 'width 0.2s ease',
    },
    eyebrow: {
        fontSize: 13,
        color: '#6B7280',
        margin: '0 0 20px',
    },
    headline: {
        fontFamily: "Georgia, 'Iowan Old Style', serif",
        fontSize: 24,
        lineHeight: 1.35,
        fontWeight: 600,
        margin: '0 0 24px',
        color:"#1B2430"
    },
    input: {
        width: '100%',
        boxSizing: 'border-box',
        fontSize: 16,
        padding: '12px 14px',
        border: '1px solid #DAD5C8',
        borderRadius: 4,
        background: '#FFFFFF',
        color: '#1B2430',
        fontFamily: 'inherit',
        outline: 'none',
    },
    pillRow: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 10,
    },
    pill: {
        padding: '10px 16px',
        fontSize: 14,
        border: '1px solid #DAD5C8',
        borderRadius: 4,
        background: '#FFFFFF',
        color: '#4B5563',
        cursor: 'pointer',
        fontFamily: 'inherit',
    },
    pillSelected: {
        border: '1px solid #B08D2B',
        background: '#B08D2B',
        color: '#FAF9F6',
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 32,
    },
    backButton: {
        padding: '12px 20px',
        fontSize: 15,
        fontWeight: 600,
        color: '#4B5563',
        background: 'transparent',
        border: '1px solid #DAD5C8',
        borderRadius: 4,
        cursor: 'pointer',
        fontFamily: 'inherit',
    },
    nextButton: {
        padding: '12px 24px',
        fontSize: 15,
        fontWeight: 600,
        color: '#FAF9F6',
        background: '#B08D2B',
        border: 'none',
        borderRadius: 4,
        cursor: 'pointer',
        fontFamily: 'inherit',
        transition: 'background 0.15s ease',
    },
    nextButtonDisabled: {
        background: '#DAD5C8',
        cursor: 'not-allowed',
    },
    skipButton: {
        padding: '12px 8px',
        fontSize: 14,
        color: '#6B7280',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        fontFamily: 'inherit',
        textDecoration: 'underline',
    },
    error: {
        fontSize: 13,
        color: '#A23B2E',
        margin: '10px 0 0',
    },
    empty: {
        fontSize: 15,
        color: '#6B7280',
        padding: '48px 0',
    },
}

const isEmpty = (value: AnswerValue | undefined) =>
    value === undefined || value === null || value === ''

const QuestionCard: React.FC<QuestionCardProps> = ({
    questions = allQuestions,
    onComplete,
}) => {
    // The queue starts with the "must" questions only (required: true).
    // Everything else can only enter the queue via getAdaptiveQuestions,
    // called fresh after every answer — this mirrors RULES.md: a question
    // is asked only when it hasn't been answered and can materially
    // refine an output.
    const [queue, setQueue] = useState<Question[]>(() =>
        questions.filter((q) => q.required)
    )
    const [offeredIds, setOfferedIds] = useState<Set<string>>(
        () => new Set(questions.filter((q) => q.required).map((q) => q.id))
    )
    const [answers, setAnswers] = useState<Answer[]>([])
    const [history, setHistory] = useState<Question[]>([])
    const [draft, setDraft] = useState<AnswerValue | undefined>(undefined)
    const [error, setError] = useState<string | null>(null)

    const current = queue[0]

    // Keep the input in sync with whatever was answered before, so
    // Back shows the previous value instead of a blank field.
    useEffect(() => {
        if (!current) return
        const existing = answers.find((a) => a.questionId === current.id)
        setDraft(existing !== undefined ? (existing.value as AnswerValue) : undefined)
        setError(null)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [current?.id])

    if (!current) {
        return (
            <div style={styles.page}>
                <p style={styles.empty}>All set — building your result…</p>
            </div>
        )
    }

    const advance = (value: AnswerValue) => {
        const newAnswer: Answer = {
            id: String(answers.length + 1),
            questionId: current.id,
            value,
        }
        const newAnswers = [
            ...answers.filter((a) => a.questionId !== current.id),
            newAnswer,
        ]

        // Recompute the profile with the latest answer, then ask the
        // domain layer what — if anything — is now worth asking.
        const profile = buildProfile(questions, newAnswers)
        const adaptive = getAdaptiveQuestions(profile, newAnswers, questions).filter(
            (q) => !offeredIds.has(q.id)
        )

        const restOfQueue = queue.slice(1)
        const updatedQueue = [...restOfQueue, ...adaptive]

        if (adaptive.length > 0) {
            const nextOffered = new Set(offeredIds)
            adaptive.forEach((q) => nextOffered.add(q.id))
            setOfferedIds(nextOffered)
        }

        setAnswers(newAnswers)
        setHistory((h) => [...h, current])
        setQueue(updatedQueue)

        if (updatedQueue.length === 0) {
            onComplete(newAnswers)
        }
    }

    const goNext = () => {
        if (current.required && isEmpty(draft)) {
            setError('This one is required to continue.')
            return
        }
        advance(draft ?? '')
    }

    const skip = () => advance('')

    const goBack = () => {
        if (history.length === 0) return
        const prevQuestion = history[history.length - 1]
        setHistory((h) => h.slice(0, -1))
        setQueue((q) => [prevQuestion, ...q])
        // Note: going back re-shows a prior question but doesn't unwind
        // any adaptive questions it may have unlocked further down the
        // queue — editing an earlier answer won't retract a question
        // that's already been added.
    }

    const renderInput = () => {
        if (current.answerType === 'select' && current.options) {
            return (
                <div style={styles.pillRow}>
                    {current.options.map((opt) => (
                        <button
                            key={opt}
                            type="button"
                            style={{
                                ...styles.pill,
                                ...(draft === opt ? styles.pillSelected : {}),
                            }}
                            onClick={() => setDraft(opt)}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            )
        }

        if (current.answerType === 'boolean') {
            return (
                <div style={styles.pillRow}>
                    {[
                        { label: 'Yes', val: true },
                        { label: 'No', val: false },
                    ].map(({ label, val }) => (
                        <button
                            key={label}
                            type="button"
                            style={{
                                ...styles.pill,
                                ...(draft === val ? styles.pillSelected : {}),
                            }}
                            onClick={() => setDraft(val)}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            )
        }

        if (current.answerType === 'number') {
            return (
                <input
                    style={styles.input}
                    type="number"
                    value={draft === undefined ? '' : String(draft)}
                    onChange={(e) =>
                        setDraft(e.target.value === '' ? undefined : Number(e.target.value))
                    }
                    placeholder="Enter a number"
                />
            )
        }

        return (
            <input
                style={styles.input}
                type="text"
                value={draft === undefined ? '' : String(draft)}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Type your answer"
            />
        )
    }

    const totalKnown = history.length + queue.length
    const progressPct = totalKnown > 0 ? (history.length / totalKnown) * 100 : 0
    const nextDisabled = current.required && isEmpty(draft)

    return (
        <div style={styles.page}>
            <div style={styles.progressTrack}>
                <div style={{ ...styles.progressFill, width: `${progressPct}%` }} />
            </div>
            <p style={styles.eyebrow}>
                Question {history.length + 1} of {totalKnown}
                {queue.length > 1 ? ' (so far)' : ''}
            </p>
            <h2 style={styles.headline}>{current.text}</h2>

            {renderInput()}
            {error && <p style={styles.error}>{error}</p>}

            <div style={styles.footer}>
                <button
                    type="button"
                    style={styles.backButton}
                    onClick={goBack}
                    disabled={history.length === 0}
                >
                    Back
                </button>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {!current.required && (
                        <button type="button" style={styles.skipButton} onClick={skip}>
                            Skip
                        </button>
                    )}
                    <button
                        type="button"
                        style={{
                            ...styles.nextButton,
                            ...(nextDisabled ? styles.nextButtonDisabled : {}),
                        }}
                        onClick={goNext}
                        onMouseOver={(e) => {
                            if (!nextDisabled) e.currentTarget.style.background = '#9A7B1D'
                        }}
                        onMouseOut={(e) => {
                            if (!nextDisabled) e.currentTarget.style.background = '#B08D2B'
                        }}
                    >
                        {queue.length === 1 ? 'See my result' : 'Next'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default QuestionCard