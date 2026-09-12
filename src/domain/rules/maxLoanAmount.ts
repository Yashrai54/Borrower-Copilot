import type { BorrowerProfile } from "../borrower/types";
import { calculateFoir } from "../calculations/foir";
import { safeEmi } from "../calculations/safeEmi";
import { fairRate } from "./fairRate";

export const calculateMaximumLoanAmount = (profile: BorrowerProfile) => {
  const safeemi = safeEmi(profile);

 const tenure =
  profile.loanRequest.preferredTenureInMonths &&
  profile.loanRequest.preferredTenureInMonths > 0
    ? profile.loanRequest.preferredTenureInMonths
    : 60;

  const offeredRate = profile.loanRequest.offeredInterestRate;
  const fairRateRange = fairRate(profile);

 const annualRate =
  offeredRate && offeredRate > 0
    ? offeredRate
    : fairRateRange?.max;
    
    console.log({
  tenure,
  offeredRate,
  fairRateRange,
  annualRate
});
  if (annualRate === undefined || annualRate < 0) {
    return undefined;
  }

  const monthlyInterestRate = annualRate / 12 / 100;

  if (monthlyInterestRate === 0) {
    return safeemi * tenure;
  }

  return (
    safeemi * (Math.pow(1 + monthlyInterestRate, tenure) - 1)
  ) / (
    monthlyInterestRate *
    Math.pow(1 + monthlyInterestRate, tenure)
  );
};

export const lenderSideMaximumLoanAmount = (profile:BorrowerProfile)=>{
    
    const foirLimit = 0.50
    const foir = calculateFoir(profile)

    const diff = foirLimit - (foir!/100)

    const emi = diff* profile.income.monthlyNetIncome
    

      const tenure =
  profile.loanRequest.preferredTenureInMonths &&
  profile.loanRequest.preferredTenureInMonths > 0
    ? profile.loanRequest.preferredTenureInMonths
    : 60;

      const offeredRate = profile.loanRequest.offeredInterestRate;

    const fairRateRange = fairRate(profile);

 const annualRate =
  offeredRate && offeredRate > 0
    ? offeredRate
    : fairRateRange?.max;


   if (annualRate === undefined || annualRate < 0) {
        return undefined;
    }

    if (tenure === undefined || tenure <= 0) {
        return undefined;
    }
    if(emi === undefined || emi<=0){
        return undefined;
    }

    const monthlyInterestRate = annualRate / 12 / 100;

    if (monthlyInterestRate === 0) {
        return emi * tenure;
    }

    return (
        emi *
        (Math.pow(1 + monthlyInterestRate, tenure) - 1)
    ) / (
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, tenure)
    );
}