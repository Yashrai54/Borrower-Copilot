import type { BorrowerProfile } from "../borrower/types";
import type { LoanProduct } from "../borrower/types";
 const productTypeMapping:Record<LoanProduct,{min:number,max:number}>  = {
        PERSONAL_LOAN: { min: 10, max: 18 },
        BUSINESS_LOAN: { min: 9.9, max: 18 },
        TWO_WHEELER_LOAN: { min: 8, max: 15 },
        LOAN_AGAINST_PROPERTY: { min: 7.5, max: 14 },
        UNKNOWN:{min:0,max:0}
    }
    
export const fairRate = (profile: BorrowerProfile) => {
  const product = profile.loanRequest.productType
  if (!product) return undefined

  const base = productTypeMapping[product]

  let min = base.min
  let max = base.max

  const creditScore = profile.creditScore.score
  const repaymentBehavior = profile.creditHistory?.repaymentPattern
  const stability = profile.income.stability

  // Credit risk
  if (creditScore !== undefined) {
    if (creditScore < 550) {
      min += 4
      max += 6
    } else if (creditScore < 700) {
      min += 2
      max += 4
    } else if (creditScore >= 750) {
      min -= 1
      max -= 2
    }
  } else {
    // Unknown credit history = wider uncertainty
    max += 3
  }

  // Repayment behaviour
  if (repaymentBehavior === "Poor") {
    min += 3
    max += 5
  } else if (repaymentBehavior === "Good") {
    min -= 0.5
    max -= 1
  }

  // Income stability
  if (stability === "UNSTABLE") {
    min += 2
    max += 3
  } else if (stability === "STABLE") {
    min -= 0.5
    max -= 1
  }

  return {
    min: Math.max(0, min),
    max: max
  }
}