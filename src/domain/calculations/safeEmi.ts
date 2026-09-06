import type { BorrowerProfile } from "../borrower/types";

export const safeEmi = (profile: BorrowerProfile) => {
    const monthlyNetIncome = profile.income.monthlyNetIncome
    const essentialExpenses = profile.essentialExpenses.rent + profile.essentialExpenses.insurance + profile.essentialExpenses.utilities
   const hasThreeMonthEmergencyFund =
        profile.emergencyFund !== undefined &&
        profile.emergencyFund >= 3 * essentialExpenses;
  
    const bufferRate = {
        STABLE:hasThreeMonthEmergencyFund ? 0.10 : 0.15,
        VARIABLE: hasThreeMonthEmergencyFund ? 0.20 : 0.25,
        UNSTABLE: hasThreeMonthEmergencyFund ? 0.30 : 0.35
    }

    const exisitingDebts = profile.existingDebt.monthlyDebtObligation


    const safetyBuffer = essentialExpenses * bufferRate[profile.income.stability]

    let diff;

    diff = monthlyNetIncome - essentialExpenses - exisitingDebts - safetyBuffer!


    return Math.max(0, (diff * 40) / 100)

}