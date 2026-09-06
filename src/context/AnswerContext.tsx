import React, { createContext, useContext, useState } from 'react'
import type { Answer } from '../domain/QuestionAnswer/types'
import { answers as defaultAnswers } from '../domain/QuestionAnswer/data'

type AnswersContextValue = {
    answers: Answer[]
    setAnswers: (answers: Answer[]) => void
}

const AnswersContext = createContext<AnswersContextValue | undefined>(undefined)

export const AnswersProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [answers, setAnswers] = useState<Answer[]>(defaultAnswers)

    return (
        <AnswersContext.Provider value={{ answers, setAnswers }}>
            {children}
        </AnswersContext.Provider>
    )
}

export const useAnswers = (): AnswersContextValue => {
    const ctx = useContext(AnswersContext)
    if (!ctx) {
        throw new Error('useAnswers must be used within an AnswersProvider')
    }
    return ctx
}