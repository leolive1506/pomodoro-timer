# Styled-components
## Criando theme com styled-components
- Com styled-components podemos ter quantos temas quiser
- Criar um arquivo para theme
```tsx
export const defaultTheme = {
    primary: 'purple',
    secondary: 'orange'
}
```
- No app
```tsx
import { ThemeProvider } from 'styled-components'
// nosso theme
import { defaultTheme } from './styles/themes/default'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      app
    </ThemeProvider>
  )
}
```
- Utilizar as cores de acordo com o theme
```tsx
export const ButtonContainer = styled.button`
    color: ${props => props.theme.primary}
`
```

## Tipar props.theme do styled-components

### Criar um arquivo de definição de tipos
- So aceita ts, definição de tipo
    - styles.d.ts
```tsx
import 'styled-components'
import { defaultTheme } from '../styles/themes/default'

type ThemeType = typeof defaultTheme

// sobrescrever algo no styled-components
declare module 'styled-components' {
    export interface DefaultTheme extends ThemeType {}
}
```

## Criar estilos globais com styled-components
- Criar um arquivo global e colocar
```tsx
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle``

```
- importar no app
```tsx
export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
       <GlobalStyle />
    </ThemeProvider>
  )
}
```

# ESLint
```sh
npm i eslint -D
npm i @rocketseat/eslint-config -D
npx eslint --init
```
- Criar arquivo .eslintrc.json
```json
{
    "extends": "@rocketseat/eslint-config/react"
}
```

```sh
# Mostrar erros eslint
npx eslint src --ext .ts,.tsx

# Corrigir erros eslint de form automatica
npx eslint src --ext .ts,.tsx
```

# Router DOM
```sh
npm i react-router-dom
```
- Criar rotas
```tsx
import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { History } from './pages/History'

export function Router() {
  return (
    <Routes>
        <Route path="/" element={<DefaultLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/history" element={<History />} />
        </Route>
        // aplica layout admin pra tudo começar com admin
        // /admin/products
        <Route path="/admin" element={<AdminLayout />}>
            <Route path="/products" element={<Product />} />
        </Route>
    </Routes>
  )
}

```
- Usar no app
```tsx
import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'
import { Router } from './Router'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  )
}
```