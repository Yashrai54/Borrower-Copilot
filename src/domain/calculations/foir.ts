import type { BorrowerProfile } from "../borrower/types"

export const calculateFoir = (profile:BorrowerProfile) =>{
    const totalMonthlyFixedObligations = profile.existingDebt.monthlyDebtObligation  
    

    const totalMonthlyIncome = profile.income.monthlyNetIncome
    if (totalMonthlyIncome <= 0) {
    return;
}

    const foir = (totalMonthlyFixedObligations/totalMonthlyIncome )*100;

    return foir;

}