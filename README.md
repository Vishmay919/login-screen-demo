# Create Account Flow

A multi step account signup flow built from a Figma design. It walks the user
through picking an account type, verifying a mobile number with an OTP, entering
their name, and setting a password, then shows a summary of what they entered.

Live demo: https://login-screen-demo.vercel.app/

## Tech stack

- React 19 with TypeScript
- Vite for the dev server and build
- MUI v9 for interactive primitives (buttons, inputs, menu, modal)
- CSS Modules for all visual styling

## Getting started

```bash
npm install
npm run dev
```

The app runs on `http://localhost:5173` by default.

Other scripts:

```bash
npm run build     # type-check, then produce a production build in dist/
npm run preview   # serve the production build locally
npm run lint      # run ESLint
```

## Project structure

```
src/
  components/          reusable UI pieces shared across steps
    AuthLayout/        left illustration panel + right card shell
    ProgressBar/       top progress indicator
    TextField/         labelled input with error and helper states
    SelectableCard/    the account type option cards
    OtpInput/          four box one time code input
    WizardFooter/      shared Back / Continue row
    icons.tsx          inline SVG icon set
  features/signup/
    SignupWizard.tsx   owns the current step, form data, and transitions
    steps/             one component per step
    SuccessModal.tsx   final summary dialog
    api.ts             the network calls (send OTP, verify, create account)
    validation.ts      field validation rules
    steps.ts           step order and progress values
    types.ts           the shape of the form data
  theme.ts             MUI theme
  index.css            design tokens as CSS variables
```

## Architecture and design decisions

### One place owns the state

`SignupWizard` holds everything: which step is active, the collected form data,
and the direction of the last transition (used for the slide animation). Each
step is a presentational component that receives the current data plus `onNext`
and `onBack` callbacks. Nothing about the flow lives in global state or context,
because the whole thing is a single self contained screen and passing props down
one level is clearer than adding a store.

Steps are listed in `steps.ts`, so the order of the flow and its progress bar
values are defined in one file rather than hard coded across components.

### Styling: MUI for behaviour, CSS Modules for looks

MUI is used for the parts that are annoying to build correctly by hand: focus
management, the dropdown menu, the modal, ripple feedback, and accessible button
semantics. The visual styling is not done through MUI's `sx` prop or theme
overrides. Instead every component has its own `.module.css` file and overrides
the MUI element with a plain class name.

This keeps the markup readable and the styling in one predictable place per
component. Class names use snake_case (for example `login_card`, `control_error`).

One catch worth noting: MUI v9 injects its own styles into the page after the
CSS Module styles, which meant the class overrides were silently losing. Wrapping
the app in `<StyledEngineProvider injectFirst>` (see `App.tsx`) puts MUI's styles
first so the module classes win without needing `!important`.

### Design tokens

Colours, radii, shadows, and the easing curve are defined once as CSS variables
in `index.css` and referenced everywhere. The MUI theme in `theme.ts` mirrors the
same palette so the few components that read from the theme stay consistent with
the rest.

### Icons

The Figma file uses Font Awesome 6 Pro, which is a paid set. Rather than pull in
an icon library, the handful of icons that are actually needed are hand written
as inline SVG in `icons.tsx`. They inherit colour through `currentColor` and take
their size from a class, so they behave like text.

### The network layer is kept in one file

All of the calls that would hit a server live in `api.ts`: `sendOtp`,
`verifyOtp`, and `createAccount`. Right now their bodies are simulated with a
short delay, and `verifyOtp` rejects the code `0000` to stand in for a failed
response. To connect a real backend you replace the three function bodies with
fetch calls and leave their signatures alone. The steps that call them do not
change.

Each step that makes a call wraps it in `try/catch`, shows a spinner while it is
in flight, and displays the error message if the call is rejected. So the wrong
code, a failed send, and a failed account creation already have a place to show
up in the UI, rather than being something to wire in later.

### Validation and states

Validation rules live in `validation.ts` as small pure functions, one per field.
A step runs them on submit and, once submitted, keeps re-checking on every change
so the error clears as soon as the input becomes valid. Every field has a normal,
focused, error, and disabled state.

### Responsive summary

The success summary shows label and value side by side on wider screens. On
narrow screens (a folded phone at 344px, for example) that layout cannot fit both,
so the rows stack and the value takes the full width. A very long value is
truncated with an ellipsis and the full text stays available on hover.

### Accessibility

Inputs are tied to their labels, error messages are linked with
`aria-describedby`, the progress bar and OTP group have appropriate roles and
labels, and focus states are visible from the keyboard.

## Note on the flow

The Figma summary screen lists an Email row, but there is no step in the flow
that collects an email address. The summary here shows the values the flow
actually gathers: account type, name, and mobile number.

