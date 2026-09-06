import type { BorrowerProfile } from "../borrower/types";

export const calculateEmi = (profile: BorrowerProfile) => {
    const principal = profile.loanRequest.loanAmount;
    const annualRate = profile.loanRequest.offeredInterestRate;
    const tenure = profile.loanRequest.preferredTenureInMonths;

    if (!principal || principal <= 0) {
        return undefined;
    }

    if (!annualRate || annualRate < 0) {
        return undefined;
    }

    if (!tenure || tenure <= 0) {
        return undefined;
    }

    const monthlyRate = annualRate / 12 / 100;

    if (monthlyRate === 0) {
        return principal / tenure;
    }

    return (
        principal *
        monthlyRate *
        Math.pow(1 + monthlyRate, tenure)
    ) / (
        Math.pow(1 + monthlyRate, tenure) - 1
    );
};