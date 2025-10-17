# SOT:UI:JASON

Solution to the second round of the __GoldenSet Collective__ intern to hire program

## 🛠️ SET UP

### How to run 

Clone the repository

```bash
git clone https://github.com/jxav22/SOT-UI-JASON.git
cd SOT-UI-JASON
```

Install dependencies

```bash
npm install
```

Run the app

```bash
npm run dev
```

### How to run tests

```bash
npm test
```

## ❓ Q & A

### 🧭 What was your approach to solving the problem?

#### 📝 Strategy

As I was aiming to not use any external libraries, I tried to find ways to avoid re-implementing form functionality from scratch. To start this off I did some research on webforms.

I found this tutorial on MDN which was fairly useful:

[https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms)

The section on client-side form validation was the most relevant part, it introduced me to the constraint validation API. 

[https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation)

After a bit of experimentation this resulted in the `ValidatedInput.tsx` component - an implementation of the API that allows custom validation patterns and basic state management. The patterns that I wrote up for this can be found in `validators.ts`.

#### 📁 Structure

```
SOT-UI-JASON/
├── README.md                # Project overview
├── app/
│   └── page.tsx             # Main page
├── components/
│   ├── Form.tsx             # Main form component
│   ├── Form.module.css      # BEM-style CSS classes for form styling
│   ├── ValidatedInput.tsx   # Custom input component using the Constraint Validation API
├── data/                    
│   ├── registeredEmails.ts  # Hardcoded list of registered emails
├── utils/
│   ├── validators.ts        # Validation functions for the ValidatedInput component
│   ├── validators.test.ts   # Comprehensive unit testing for the validation functions
│   ├── enums.ts             # Enums used in form state management

```
#### 📐 Conventions

- Semantic commit messages:

See this:
    
[https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716)

- BEM based style classes:

[https://getbem.com/](https://getbem.com/)

Used in `Form.module.css`

- Component level JsDocs:

Used in `Form.tsx` and `ValidatedInput.tsx`

### 🤖 How much AI did you use?

`ChatGPT`
For determining areas to research before getting started, and for verifying best practices.  

`Agent Mode (VsCode) | Cursor`
Generating tests, documentation, for refactoring and checking for errors.

### 🔍 In your opinion, where are the places you could do better?

I hardcoded the list of registered emails in registeredEmails.ts, which would definately be an issue if this was worked on more. 

A change that I could do next is experimenting with Postgres or SQLlite for a more robust storage solution. 

It would also be cool to add more comprehensive unit testing, and to experiment with making the framework for pattern validation a bit more standardized. 

