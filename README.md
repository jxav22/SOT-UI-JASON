# 🚀 SOT:UI:\_\_JASON\_\_

Solution to the second round of the GoldenSet intern to hire program

## 🛠️ Setting everything up

### ▶️ How to run the project

Clone the repository

```bash
git clone https://github.com/jxav22/SOT-UI-JASON.git
cd SOT-UI-JASON
```

Install dependencies

```bash
npm install
```

Run it

```bash
npm run dev
```

### ✅ How to run the tests

```bash
npm test
```

## ❓ Q & A

### 🧭 What was your approach to solving the problem?

#### 📝 Overview

My goal was to avoid re-implementing features from scratch, so I started off by researching what was out there. I found this tutorial on MDN which was fairly useful:

[https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms)

The section on client-side form validation was the most relevant part, it introduced me to the constraint validation API. 

[https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation)

After a bit of experimentation this resulted in the `ValidatedInput.tsx` component - an implementation of the API that allows custom validation patterns and basic state management. The patterns that I wrote up for this can be found in `validators.ts`.

#### 📁 Structure

```
SOT-UI-JASON/
├── README.md                # Project overview and setup instructions
├── app/
│   └── page.tsx             # Main page
├── components/
│   ├── Form.tsx             # Form component with JsDocs
│   ├── Form.module.css      # BEM-style CSS classes for form styling
│   ├── ValidatedInput.tsx   # Custom input component using the Constraint Validation API
├── data/                    
│   ├── registeredEmails.ts  # Hardcoded list of registered emails
├── utils/
│   ├── validators.ts        # Validation functions for the ValidatedInput component
│   ├── validators.test.ts   # Comprehensive unit testing for the validation functions
│   ├── enums.ts             # Declares the enums used in form state management

```
#### 📐 Conventions

Semantic commit messages:

    See this c:
    
    https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716

BEM based style classes:

    [https://getbem.com/](https://getbem.com/)

    Used in `Form.module.css`

Component level JsDocs:

    Used in `Form.tsx` and `ValidatedInput.tsx`

### 🤖 How much AI did you use?

I used a good mix of AI tooling to complete this

`ChatGPT`
For determining areas to research and upskill in before getting started. 

`Agent Mode | Copilot (VsCode)`
Generating tests, documentation, for quick refactors and checking for errors.

### 🔍 In your opinion, where are the places you could do better?

I hardcoded the list of registered emails in registeredEmails.ts, which would definately be an issue if this was expanded.  

A change that I could do next is storing it locally, with something like sqllite, or hosting it somewhere else and calling the data from an API.

It would also be cool to add more comprehensive unit testing and to create a framework for validation patterns. 

