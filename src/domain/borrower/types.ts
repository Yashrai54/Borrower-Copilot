type EmploymentType = "SALARIED" | "SELF-EMPLOYED" | "UNEMPLOYED" ;
type IncomeStability = "STABLE" | "VARIABLE" | "UNSTABLE";
type CreditScore = "KNOWN" | "NO STATUS" | "UNKNOWN";

export type LoanProduct = "PERSONAL_LOAN" | "BUSINESS_LOAN" | "TWO_WHEELER_LOAN" | "LOAN_AGAINST_PROPERTY" | "UNKNOWN"
type SecurityType = "SECURED" | "UNSECURED";


export type BorrowerProfile = {
    income:{
        monthlyNetIncome:number,
        stability:IncomeStability
    },
    householdSize?:{
        earningMembers:number,
        dependents:number,
    },
    existingDebt:{
        monthlyDebtObligation:number,
        outstandingDebtBalance?:number,
    },
    essentialExpenses:{
        rent:number,
        utilities:number,
        insurance:number,
    },
    loanRequest:{
        loanAmount:number,
        loanPurpose:string,
        productType:LoanProduct,
        securityType:SecurityType,
        preferredTenureInMonths?:number,
        offeredInterestRate?:number,
    }
    employmentType:EmploymentType,
    creditScore:{
        status:CreditScore,
        score?:number,
    },
    emergencyFund?:number,
    collateralValue?:{
        type:"Property" | "Vehicle" | "Other",
        value:number,
    },
    creditHistory?:{
        hasPreviousLoans:boolean,
        repaymentPattern?: "Good" | "Average" | "Poor",
        recentMissedPayments?:number,
    },
}