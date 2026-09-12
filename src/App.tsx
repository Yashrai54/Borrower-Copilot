import './App.css'
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import { AnswersProvider, useAnswers } from './context/AnswerContext'
import Result from "./components/Result"
import NegotiationCard from './components/NegotiationCard'
import QuestionCard from './components/QuestionCard'
import Home from './Home'
import Layout from './Layout'

const QuestionCardRoute = () => {
    const { setAnswers } = useAnswers()
    const navigate = useNavigate()

    return (
        <QuestionCard
            onComplete={(answers) => {
                setAnswers(answers)
                navigate('/result')
            }}
        />
    )
}

function App() {
    return (
            <AnswersProvider>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/result" element={<Result />} />
                        <Route path="/negotiation" element={<NegotiationCard />} />
                        <Route path="/questions" element={<QuestionCardRoute />} />
                    </Routes>
                </Layout>
            </AnswersProvider>
    )
}

export default App