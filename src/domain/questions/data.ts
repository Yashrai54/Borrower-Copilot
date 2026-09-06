import type { Question } from "./types"

// ---- Income ----
const monthlyIncomeQuestion: Question = {
    id: "monthlyIncome",
    text: "What is your take home monthly income?",
    required: true,
    answerType: "number",
    mapsTo: "income.monthlyNetIncome",
    affects: ["borrowerVerdict", "maximumLoanAmount", "safeLoanAmount", "emiCeiling", "fairRate"]
}

const incomeStabilityQuestion: Question = {
    id: "incomeStability",
    text: "How stable is your income?",
    required: true,
    answerType: "select",
    options: ["STABLE", "VARIABLE", "UNSTABLE"],
    mapsTo: "income.stability",
    affects: ["borrowerVerdict", "fairRate"]
}

const productTypeQuestion : Question = {
    id:"productType",
    text:"What type of loan are you considering?",
    required:true,
    answerType:"select",
    options:["PERSONAL_LOAN" , "BUSINESS_LOAN" , "TWO_WHEELER_LOAN" , "LOAN_AGAINST_PROPERTY","UNKNOWN"],
    mapsTo:"loanRequest.productType",
    affects:["borrowerVerdict","fairRate"]
}
// ---- Household ----
const earningMembersQuestion: Question = {
    id: "earningMembers",
    text: "How many earning members are in your household?",
    required: false,
    answerType: "number",
    mapsTo: "householdSize.earningMembers",
    affects: ["borrowerVerdict", "maximumLoanAmount", "safeLoanAmount"]
}

const dependentsQuestion: Question = {
    id: "dependents",
    text: "How many dependents do you support?",
    required: false,
    answerType: "number",
    mapsTo: "householdSize.dependents",
    affects: ["borrowerVerdict", "safeLoanAmount"]
}

// ---- Existing debt ----
const existingDebtQuestion: Question = {
    id: "existingDebt",
    text: "What is your existing monthly debt obligation?",
    required: true,
    answerType: "number",
    mapsTo: "existingDebt.monthlyDebtObligation",
    affects: ["borrowerVerdict", "maximumLoanAmount", "safeLoanAmount", "emiCeiling", "fairRate"]
}

const outstandingDebtBalanceQuestion: Question = {
    id: "outstandingDebtBalance",
    text: "What is your total outstanding debt balance?",
    required: false,
    answerType: "number",
    mapsTo: "existingDebt.outstandingDebtBalance",
    affects: ["borrowerVerdict", "fairRate"]
}

// ---- Essential expenses ----
const rentQuestion: Question = {
    id: "rent",
    text: "What is your monthly rent expense?",
    required: false,
    answerType: "number",
    mapsTo: "essentialExpenses.rent",
    affects: ["borrowerVerdict", "safeLoanAmount"]
}

const utilitiesQuestion: Question = {
    id: "utilities",
    text: "What is your monthly utilities expense?",
    required: false,
    answerType: "number",
    mapsTo: "essentialExpenses.utilities",
    affects: ["borrowerVerdict", "safeLoanAmount"]
}

const insuranceQuestion: Question = {
    id: "insurance",
    text: "What is your monthly insurance expense?",
    required: false,
    answerType: "number",
    mapsTo: "essentialExpenses.insurance",
    affects: ["borrowerVerdict", "safeLoanAmount"]
}

// ---- Loan request ----
const loanAmountQuestion: Question = {
    id: "loanAmount",
    text: "How much would you like to borrow?",
    required: true,
    answerType: "number",
    mapsTo: "loanRequest.loanAmount",
    affects: ["borrowerVerdict", "maximumLoanAmount", "safeLoanAmount", "emiCeiling", "fairRate"]
}

const loanPurposeQuestion: Question = {
    id: "loanPurpose",
    text: "What is the purpose of this loan?",
    required: true,
    answerType: "text",
    mapsTo: "loanRequest.loanPurpose",
    affects: ["borrowerVerdict", "fairRate"]
}

const preferredTenureQuestion: Question = {
    id: "preferredTenure",
    text: "What repayment tenure (in months) would you prefer?",
    required: false,
    answerType: "number",
    mapsTo: "loanRequest.preferredTenureInMonths",
    affects: ["emiCeiling", "fairRate"]
}

const offeredInterestRateQuestion: Question = {
    id: "offeredInterestRate",
    text: "Has an interest rate already been offered to you?",
    required: false,
    answerType: "number",
    mapsTo: "loanRequest.offeredInterestRate",
    affects: ["fairRate"]
}

// ---- Employment ----
const employmentTypeQuestion: Question = {
    id: "employmentType",
    text: "What is your employment type?",
    required: true,
    answerType: "select",
    options: ["SALARIED", "SELF-EMPLOYED", "UNEMPLOYED"],
    mapsTo: "employmentType",
    affects: ["borrowerVerdict", "maximumLoanAmount", "safeLoanAmount", "emiCeiling", "fairRate"]
}

// ---- Credit score ----
const creditScoreStatusQuestion: Question = {
    id: "creditScoreStatus",
    text: "What is your credit score status?",
    required: true,
    answerType: "select",
    options: ["KNOWN", "NO STATUS", "UNKNOWN"],
    mapsTo: "creditScore.status",
    affects: ["borrowerVerdict", "maximumLoanAmount", "safeLoanAmount", "emiCeiling", "fairRate"]
}

const creditScoreValueQuestion: Question = {
    id: "creditScoreValue",
    text: "What is your credit score?",
    required: false,
    answerType: "number",
    mapsTo: "creditScore.score",
    affects: ["fairRate"]
}

// ---- Optional / risk-mitigating info ----
const emergencyFundQuestion: Question = {
    id: "emergencyFund",
    text: "How much do you have set aside as an emergency fund?",
    required: false,
    answerType: "number",
    mapsTo: "emergencyFund",
    affects: ["borrowerVerdict", "safeLoanAmount"]
}

const collateralTypeQuestion: Question = {
    id: "collateralType",
    text: "What type of collateral can you offer, if any?",
    required: false,
    answerType: "select",
    options: ["Property", "Vehicle", "Other"],
    mapsTo: "collateralValue.type",
    affects: ["maximumLoanAmount", "fairRate"]
}

const collateralValueQuestion: Question = {
    id: "collateralValueAmount",
    text: "What is the estimated value of your collateral?",
    required: false,
    answerType: "number",
    mapsTo: "collateralValue.value",
    affects: ["maximumLoanAmount", "fairRate"]
}

const hasPreviousLoansQuestion: Question = {
    id: "hasPreviousLoans",
    text: "Have you taken loans in the past?",
    required: false,
    answerType: "boolean",
    mapsTo: "creditHistory.hasPreviousLoans",
    affects: ["borrowerVerdict", "fairRate"]
}

const repaymentPatternQuestion: Question = {
    id: "repaymentPattern",
    text: "How would you describe your past repayment pattern?",
    required: false,
    answerType: "select",
    options: ["Good", "Average", "Poor"],
    mapsTo: "creditHistory.repaymentPattern",
    affects: ["borrowerVerdict", "fairRate"]
}

const recentMissedPaymentsQuestion: Question = {
    id: "recentMissedPayments",
    text: "How many payments have you missed recently?",
    required: false,
    answerType: "number",
    mapsTo: "creditHistory.recentMissedPayments",
    affects: ["borrowerVerdict", "fairRate"]
}
const incomeDocumentationQuestion: Question = {
    id: "incomeDocumentation",
    text: "Do you have documents or records that can verify your income?",
    required: false,
    answerType: "boolean",
    mapsTo: "income.hasDocumentation",
    affects: ["borrowerVerdict", "fairRate"]
};




export const questions: Question[] = [
    monthlyIncomeQuestion,
    incomeStabilityQuestion,
    earningMembersQuestion,
    dependentsQuestion,
    existingDebtQuestion,
    outstandingDebtBalanceQuestion,
    rentQuestion,
    utilitiesQuestion,
    insuranceQuestion,
    loanAmountQuestion,
    loanPurposeQuestion,
    preferredTenureQuestion,
    offeredInterestRateQuestion,
    employmentTypeQuestion,
    creditScoreStatusQuestion,
    creditScoreValueQuestion,
    emergencyFundQuestion,
    collateralTypeQuestion,
    collateralValueQuestion,
    hasPreviousLoansQuestion,
    repaymentPatternQuestion,
    recentMissedPaymentsQuestion,
    productTypeQuestion,
    incomeDocumentationQuestion
]