import React from 'react'
import { Reset } from 'styled-reset'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import CurrencyConvertor from './CurrencyConvertor'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { theme } from '../themes/defaultTheme'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

export const App = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <Reset />
    <QueryClientProvider client={queryClient}>
      <CurrencyConvertor />
    </QueryClientProvider>
  </ThemeProvider>
)

const GlobalStyle = createGlobalStyle`
  body {
    color: ${(props) => props.theme.colors.black};
    font-family: Arial;
    font-size: 1rem;
    padding: 20px 0;
  }

  h1 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 20px;
  }
`
