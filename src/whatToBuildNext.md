### Borrower Copilot — Five-Minute Walkthrough

Borrower Copilot is designed to help a borrower understand not just whether they can get a loan, but whether the loan is actually affordable and what terms they should negotiate.

The walkthrough starts with the borrower entering basic information such as income, income stability, employment type, existing debt, household responsibilities, expenses, requested loan amount, purpose, credit status, and repayment history.

Instead of asking every possible question upfront, the Copilot uses adaptive questioning. It asks additional questions only when they can materially improve the decision. For example, a self-employed borrower may be asked about income documentation, while someone with existing debt may be asked about their outstanding balance.

Once enough information is available, the Copilot produces four important outputs: the borrower's safe EMI, the maximum amount they can reasonably afford, the lender-side maximum, and a fair interest-rate range. It then converts these calculations into a simple decision: **Borrow, Borrow Less, or Don't Borrow.**

I would demonstrate this using the three profiles.

For **Priya**, the Copilot recommends **Borrow**. She has a stable ₹1.1 lakh monthly income, a 780 credit score, good repayment history, and requests ₹8 lakh. Her calculated borrower maximum is approximately ₹11.4 lakh, with a safe EMI of ₹25,359 and a fair rate of 8–14%. The recommendation is therefore straightforward.

For **Ravi**, the recommendation is **Borrow Less**. Although he has ₹45 lakh worth of property and no existing monthly debt, his requested ₹15 lakh exceeds his calculated safe affordability limit of approximately ₹8.51 lakh. The Copilot therefore doesn't simply treat collateral as proof that the loan is affordable. It recommends reducing the borrowing amount.

For **Anita**, the recommendation is **Don't Borrow**. Her requested ₹1.5 lakh is actually within her calculated affordability limit, but her unstable income and poor recent repayment behaviour create a much higher risk. This demonstrates that the Copilot considers repayment risk independently of affordability.

The final part is the **negotiation card**. Instead of stopping at approval or rejection, the Copilot gives the borrower something actionable: the amount they should target, the EMI they can safely handle, and the interest-rate range they can use when negotiating with a lender.

### What I would build next

The next major feature I would build is a stronger negotiation layer. It would compare an actual lender offer against the Copilot's calculated fair range and explain whether the borrower is getting a reasonable deal. It could also simulate different combinations of loan amount, tenure, EMI and interest rate so the borrower can see the trade-offs before accepting an offer.

I would also add better explainability around the decision. Rather than only showing the final verdict, the Copilot could show the two or three factors that had the biggest impact on the recommendation.

### What I would cut

I would avoid adding unnecessary questions and features that make the experience feel like a traditional loan application. The goal is not to collect every possible piece of financial information; it is to collect enough information to make a useful, understandable decision.

I would also avoid overcomplicating the initial interface with too many financial metrics. The detailed calculations can remain available, but the primary experience should stay focused on three things:

**Can I afford it? → Is the offer fair? → What should I negotiate?**

That keeps Borrower Copilot focused on its core purpose: helping the borrower make a better lending decision, rather than simply helping a lender approve a loan.
