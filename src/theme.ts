import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: { main: '#0054fd' },
    error: { main: '#e0364f' },
    text: { primary: '#132c4a', secondary: '#7a8699' },
    background: { default: '#f6f7f9', paper: '#ffffff' },
  },
  typography: {
    fontFamily: "'Rubik', system-ui, -apple-system, 'Segoe UI', sans-serif",
  },
  shape: { borderRadius: 12 },
})

export default theme
