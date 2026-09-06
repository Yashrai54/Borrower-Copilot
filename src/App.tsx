import './App.css'
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom"
import { AnswersProvider, useAnswers } from './context/AnswerContext'
import Result from "./components/Result"
import NegotiationCard from './components/NegotiationCard'
import QuestionCard from './components/QuestionCard'

// Small wrapper so QuestionCard (which knows nothing about routing)
// can just hand back the finished answers.
const QuestionCardRoute = () => {
    const { setAnswers } = useAnswers()
    const navigate = useNavigate()

    return (
        <QuestionCard
            onComplete={(answers) => {
                setAnswers(answers)
                navigate('/')
            }}
        />
    )
}

function App() {
    return (
        <AnswersProvider>
                <nav style={{ padding: '16px 24px', display: 'flex', gap: 16 }}>
                    <Link to="/questions">Start</Link>
                    <Link to="/">Result</Link>
                    <Link to="/negotiationcard">Negotiation</Link>
                </nav>

                <Routes>
                    <Route path="/" element={<Result />} />
                    <Route path="/negotiationcard" element={<NegotiationCard />} />
                    <Route path="/questions" element={<QuestionCardRoute />} />
                </Routes>
        </AnswersProvider>
    )
}

export default App