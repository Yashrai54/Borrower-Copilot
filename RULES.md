# Borrower Copilot — Rules

## 1. Principles
Separate lender capacity from borrower affordability.
A lender approving an amount does not mean that amount is financially safe for the borrower.
Unknown information is not treated as zero or automatically as negative.
Recommendations should explain the reasoning behind the result.
Additional questions are asked only when their answers can materially refine an output.

## 2. Borrower Profile
The borrower profile captures:

Monthly net income
Income stability
Employment type
Household earning members and dependents
Existing monthly debt obligations
Outstanding debt balance
Essential expenses
Loan amount and purpose
Loan product
Preferred tenure
Offered interest rate
Credit-score status and score where available
Emergency fund
Collateral
Previous borrowing and repayment behaviour
Income documentation

## 3. Question Rules
Must Questions

Must questions collect the minimum information required to produce a useful borrowing assessment:

Monthly income
Income stability
Existing monthly debt obligation
Loan amount
Loan purpose
Loan product
Employment type
Credit-score status

Additional Questions

Additional questions are adaptive.

A question is asked only when:

It has not already been answered, and
Its answer can materially refine one or more outputs.

Examples:

Unknown credit history → ask about repayment pattern.
Self-employed/informal borrower → ask about income documentation.
Unknown emergency fund → ask about emergency savings.
Existing debt → ask for outstanding debt balance.

An empty answer ("") is treated as unanswered. Explicit values such as 0 and false remain valid answers.


## 4. Affordability Rules

Borrower affordability is based on disposable monthly income rather than the lender's maximum approval capacity.

Disposable Capacity

Disposable Capacity = Net Income - Essential Expenses - Existing EMI Obligations - Resilience Buffer

The buffer depends on income stability and emergency-fund coverage.

## 5. Lender Capacity Rules

Lender-side capacity estimates the amount that could potentially fit within a lender-style FOIR ceiling.
Current FOIR:

FOIR = Existing Monthly Debt Obligations / Monthly Income × 100

Product assumption:

Maximum FOIR = 50%

Remaining repayment capacity:

Available FOIR = 50% - Current FOIR

Maximum new EMI:

Maximum New EMI = Available FOIR × Monthly Income

The maximum loan amount is then calculated by reversing the EMI formula.

This is an indicative lender-capacity estimate, not a guarantee of loan approval.

## 6. Interest Rate Rules

The fair-rate output is an indicative range rather than a guaranteed offer.

The range is influenced by:

Loan product
Credit score
Repayment behaviour
Income stability
Other available risk information

Stronger credit and repayment behaviour can narrow the range toward lower rates.

Poor repayment behaviour, unstable income, or limited credit information can increase the indicative range.

Credit-score categories used by the product are heuristics and do not represent universal lender thresholds.

## 7. APR Rules

APR is treated as the borrower's all-inclusive cost of credit where applicable.

The product should distinguish between:

Interest rate
Processing fees
Other applicable charges
Total borrowing cost

The borrower should be encouraged to compare the effective cost of competing offers rather than comparing only the advertised interest rate.

Where the exact fee structure is unavailable, the product does not fabricate an APR.

## 8. EMI Rules

Monthly EMI is calculated using:

EMI = P × r × (1+r)^n / ((1+r)^n - 1)

Where:

P = principal
r = monthly interest rate
n = number of monthly instalments

Longer tenure generally reduces monthly EMI but increases total interest paid.

Shorter tenure generally increases monthly EMI but reduces total interest paid.

## 9. Stress Test Rules

The borrower should be assessed against repayment stress, not only the base-case EMI.

Stress factors include:

Income stability
Existing debt
Essential expenses
Emergency-fund coverage
Recent missed payments
High-cost existing debt

A borrower with weak repayment behaviour may be advised not to take additional debt even when the mathematical EMI capacity appears positive.

## 10. Borrow Verdict Rules

BORROW

Returned when:

The requested amount is within calculated borrower-safe affordability, and
No major repayment-risk signal requires a negative recommendation.

BORROW LESS

Returned when:

The requested amount exceeds the borrower's safe borrowing capacity, but
There is still positive repayment capacity.

The recommended amount is based on borrower affordability rather than the maximum amount a lender might offer.

DON'T BORROW

Returned when:

There is no meaningful safe repayment capacity, or
There is a significant repayment-risk signal such as poor repayment behaviour or a recent missed payment.

The decision is accompanied by the main reasons driving the recommendation.

## 11. Product Routing Rules

Loan products are treated according to their general structure:

Personal loan → generally unsecured.
Two-wheeler loan → generally secured against the vehicle.
Loan against property → secured against property.
Business loan → may be secured or unsecured depending on the product.

Security/collateral is not treated as a substitute for repayment capacity.

Collateral can increase potential lender capacity, but it does not automatically make borrowing affordable for the borrower

## 12. Negotiation Rules
The Negotiation Card is generated from the same assessment outputs used by the Borrow Verdict.

It communicates:

Requested amount
Borrower-safe amount
Lender-side estimate
Fair-rate range
Safe EMI
Key negotiation points

Borrowers are advised to:

Stay within their safe EMI.
Avoid borrowing more simply because a lender offers a higher amount.
Compare interest rates and total borrowing costs.
Confirm processing fees and other applicable charges before accepting an offer.

## 13. Confidence Rules
Confidence decreases when important information is unknown.

Examples:

Unknown credit score → wider interest-rate range and lower confidence.
Unknown emergency fund → use the more conservative resilience-buffer assumption and lower confidence.
Limited repayment history → lower confidence in risk assessment.
Missing expense information → affordability estimate becomes less precise.

Emergency-fund treatment:

Emergency fund >= 3 months of essential expenses
→ lower resilience buffer

Emergency fund < 3 months
→ normal/higher resilience buffer

Emergency fund unknown
→ normal/higher resilience buffer + lower confidence

## 14. Assumptions

The following are product assumptions or heuristics rather than universal regulatory requirements:

The product uses a 50% FOIR ceiling as an indicative lender-capacity heuristic.
A 40% ceiling on disposable repayment capacity is used when determining the borrower's safe EMI.
Emergency-fund thresholds and resilience-buffer percentages are product heuristics.
Fair-interest-rate ranges are indicative product estimates and not guaranteed lender offers.
Where tenure or rate is required to estimate a maximum loan amount but has not been provided, the product may use its documented estimation assumptions

## 15. Regulatory Requirements
The product is designed around Indian lending concepts and should not present product heuristics as regulatory mandates.

Where applicable, borrowers should receive clear information about:

Interest rate
Applicable fees and charges
Total cost of borrowing
EMI and repayment schedule
Relevant APR/KFS disclosures
Other material loan terms

Regulatory requirements may vary by lender, loan type, and applicable RBI framework. The product does not claim to replace the lender's statutory disclosures or underwriting process.

## 16. Known Limitations

This is an affordability and decision-support tool, not a lender underwriting system.
It cannot guarantee loan approval.
Actual lender eligibility depends on lender-specific underwriting policies.
Income and expense figures are self-reported.
Fair-rate ranges are indicative rather than market quotes.
Missing information reduces precision and confidence.
Collateral valuation and enforceability are not independently verified.
The product does not perform a credit-bureau check.
APR cannot be calculated precisely when applicable fees and charges are unknown.
Informal or variable income can be difficult to assess accurately without supporting documentation.