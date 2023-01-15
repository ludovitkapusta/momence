import 'styled-components'

// extend styled-components
declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: string

    colors: {
      main: string
      black: string
      white: string
      buttonColor: string
      buttonBackgroundColor: string
      buttonDisabledBackgroundColor: string
    }
  }
}
