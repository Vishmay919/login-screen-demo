import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'
import theme from './theme'
import SignupWizard from './features/signup/SignupWizard'

export default function App() {
  return (
    // injectFirst puts MUI's own styles at the top of <head> so our CSS Modules
    // win without specificity hacks.
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <SignupWizard />
      </ThemeProvider>
    </StyledEngineProvider>
  )
}
