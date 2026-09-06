import type { Question } from "../questions/types"
import type { Answer } from "../QuestionAnswer/types"
import type { BorrowerProfile } from "./types"
import { questions } from "../questions/data"
import { answers } from "../QuestionAnswer/data"


export const getAdaptiveQuestions = (
  profile: BorrowerProfile,
  answers: Answer[],
  questions: Question[]
): Question[] => {

  const asked = new Set(
    answers
      .filter(a => a.value !== "")
      .map(a => a.questionId)
  );

  return questions.filter(question => {

    if (asked.has(question.id)) {
      return false;
    }

    // --- existing conditions ---

    if (
      (profile.employmentType === "SELF-EMPLOYED" ||
       profile.employmentType === "UNEMPLOYED") &&
      question.id === "incomeDocumentation"
    ) {
      return true;
    }

    if (
      !profile.emergencyFund &&
      question.id === "emergencyFund"
    ) {
      return true;
    }

    if (
      profile.creditScore.status === "UNKNOWN" &&
      question.id === "repaymentPattern"
    ) {
      return true;
    }

    if (
      profile.existingDebt.monthlyDebtObligation > 0 &&
      question.id === "outstandingDebtBalance"
    ) {
      return true;
    }

    // --- new conditions ---

    // Essential expenses feed Disposable Capacity directly (RULES.md §4).
    // Ask them once income is known, so the affordability number isn't
    // silently computed on zero rent/utilities/insurance.
    if (
      profile.income.monthlyNetIncome > 0 &&
      (question.id === "rent" ||
       question.id === "utilities" ||
       question.id === "insurance")
    ) {
      return true;
    }

    // Household size affects the resilience buffer and safe/lender max.
    // Worth asking whenever income is known, same as essential expenses.
    if (
      profile.income.monthlyNetIncome > 0 &&
      (question.id === "earningMembers" || question.id === "dependents")
    ) {
      return true;
    }

    // Tenure/rate refine EMI and fair-rate math (RULES.md §6, §8) once
    // there's an actual loan amount to compute against.
    if (
      profile.loanRequest.loanAmount > 0 &&
      question.id === "preferredTenure"
    ) {
      return true;
    }

    if (
      profile.loanRequest.loanAmount > 0 &&
      question.id === "offeredInterestRate"
    ) {
      return true;
    }

    // A known credit-score status is only useful for fairRate once we
    // also have the actual score.
    if (
      profile.creditScore.status === "KNOWN" &&
      question.id === "creditScoreValue"
    ) {
      return true;
    }

    // Collateral only materially changes lender capacity for secured
    // products (RULES.md §11) — asking it for an unsecured personal
    // loan wouldn't refine anything.
    if (
      (profile.loanRequest.productType === "LOAN_AGAINST_PROPERTY" ||
       profile.loanRequest.productType === "TWO_WHEELER_LOAN") &&
      (question.id === "collateralType" || question.id === "collateralValueAmount")
    ) {
      return true;
    }

    // Repayment history and missed payments drive the stress-test rules
    // (RULES.md §9) — ask once we know there's borrowing history to
    // check at all.
    if (
      profile.employmentType !== "UNEMPLOYED" &&
      question.id === "hasPreviousLoans"
    ) {
      return true;
    }

    if (
      answers.some(a => a.questionId === "hasPreviousLoans" && a.value === true) &&
      question.id === "recentMissedPayments"
    ) {
      return true;
    }

    return false;
  });
};


const validateAnswers = (
    questions: Question[],
    answers: Answer[]
): Answer[] => {

    return answers.filter((answer) => {

        const question = questions.find(
            (q) => q.id === answer.questionId
        );

        if (!question) return false;

        // 1. Type validation
        let typeValid = false;

        switch (question.answerType) {
            case "number":
                typeValid =
                    typeof answer.value === "number" &&
                    Number.isFinite(answer.value);
                break;

            case "string":
                typeValid = typeof answer.value === "string";
                break;

            case "boolean":
                typeValid = typeof answer.value === "boolean";
                break;

            case "date":
                typeValid = answer.value instanceof Date;
                break;

            case "select":
                typeValid =
                    typeof answer.value === "string" &&
                    (question.options?.includes(answer.value) ?? false);
                break;
        }

        if (!typeValid) return false;

        // 2. Domain validation
        switch (question.id) {
            case "monthlyIncome":
                return answer.value as number > 0;

            case "existingDebt":
                return answer.value as number >= 0;

            case "employmentType":
                return ["SALARIED", "SELF_EMPLOYED", "INFORMAL"]
                    .includes(answer.value as string);

            case "creditScore":
                return ["KNOWN", "NO STATUS", "UNKNOWN"]
                    .includes(answer.value as string);

            default:
                return true;
        }
    });
};


export const buildProfile = (
    questions: Question[],
    answers: Answer[]
): BorrowerProfile => {

   validateAnswers(questions,answers)
   

    const profile: BorrowerProfile = {
    income: {
        monthlyNetIncome: 0,
        stability: "STABLE"
    },
    householdSize: {
        earningMembers: 0,
        dependents: 0
    },
    existingDebt: {
        monthlyDebtObligation: 0,
        outstandingDebtBalance: 0
    },
    essentialExpenses: {
        rent: 0,
        utilities: 0,
        insurance: 0
    },
    loanRequest: {
        loanAmount: 0,
        loanPurpose: "",
        productType:"UNKNOWN",
        securityType:"SECURED",
        preferredTenureInMonths: 0,
        offeredInterestRate: 0
    },
    employmentType: "SALARIED",
    creditScore: {
        status: "KNOWN",
        score: 0
    },
    emergencyFund: 0,
    collateralValue: {
        type: "Property",
        value: 0
    },
    creditHistory: {
        hasPreviousLoans: false,
        repaymentPattern: "Good",
        recentMissedPayments: 0
    }
};

    answers.forEach((answer) => {
        const question = questions.find((q) => q.id === answer.questionId);

        if (question && question.mapsTo) {
            const targetPath = question.mapsTo.split(".");
            console.log("targetPath", targetPath);
            let current: any = profile;
            for (let i = 0; i < targetPath.length - 1; i++) {
                current = current[targetPath[i]];
            }
            if(answer.value === ""){
                return;
            }
            current[targetPath[targetPath.length - 1]] = answer.value;
        }
    });

    return profile;
};

const profile = buildProfile(questions, answers);

console.log("Borrower Profile:", JSON.stringify(profile, null, 2));
