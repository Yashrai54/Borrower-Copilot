import type { BorrowerProfile } from "../borrower/types";
import { safeEmi } from "../calculations/safeEmi";
import { fairRate } from "./fairRate";
import { calculateMaximumLoanAmount, lenderSideMaximumLoanAmount } from "./maxLoanAmount";

export const decisionEngine = (profile: BorrowerProfile) => {
  const safeemi = safeEmi(profile)
  const borrowerMax = calculateMaximumLoanAmount(profile)
  const lenderMax = lenderSideMaximumLoanAmount(profile)
  const rate = fairRate(profile)

  if (safeemi <= 0) {
    return {
      verdict: "DONT_BORROW",
      reasons: [
        "Your existing debt obligations and essential expenses leave no safe monthly repayment capacity."
      ],
      safeEmi: 0,
      borrowerMax: 0,
      lenderMax: 0,
      fairRate: fairRate(profile)
    };
  }
  if (profile.loanRequest.loanAmount <= 0) {
  return {
    verdict: "NO_REQUEST",
    reasons: [
      "No loan amount has been requested, so there is no borrowing decision to make."
    ],
    safeEmi: safeemi,
    borrowerMax,
    lenderMax,
    fairRate: rate
  };
}

  if (borrowerMax === undefined || borrowerMax <= 0) {
    console.log("BORROWER MAX UNDEFINED")
    return undefined
  }

  const reasons: string[] = []

  if (
    profile.creditHistory?.repaymentPattern === "Poor" ||
    (profile.creditHistory?.recentMissedPayments ?? 0) > 0
  ) {
    reasons.push("Recent or poor repayment behaviour indicates elevated borrowing risk.")

    return {
      verdict: "DONT_BORROW",
      reasons,
      safeEmi: safeemi,
      borrowerMax,
      lenderMax,
      fairRate: rate
    }
  }

  if (safeemi <= 0) {
    reasons.push("There is no remaining safe monthly repayment capacity.")

    return {
      verdict: "DONT_BORROW",
      reasons,
      safeEmi: safeemi,
      borrowerMax,
      lenderMax,
      fairRate: rate
    }
  }

  if (profile.loanRequest.loanAmount > borrowerMax) {
    reasons.push("The requested amount exceeds the borrower's safe affordability limit.")

    return {
      verdict: "BORROW_LESS",
      reasons,
      safeEmi: safeemi,
      borrowerMax,
      lenderMax,
      fairRate: rate
    }
  }

  reasons.push("The requested amount is within the calculated safe affordability limit.")

  return {
    verdict: "BORROW",
    reasons,
    safeEmi: safeemi,
    borrowerMax,
    lenderMax,
    fairRate: rate
  }
}