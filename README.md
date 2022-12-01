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

# Formulários
## Controlled vs Uncontrolled
### Controlled
- Manter em tempo real o estado (informação)
  - Ao mudar, atualiza o estado
  - Lado positivo
    - Como tem valor em tempo real, pode facilmente reflitir alterações baseada no valor dos inputs
  - Lado negativo
    - Toda vez atualiza estado, faz uma nova renderização
    - Calcula todo componente do estado que mudou
```tsx
const [task, setTask] = useState('')
<input onChange={e => setTask(e.target.value)} value={task}>
```

### Uncontrolled
- Busca a informação somente quando precisar dela
  - Maior performace
  - Menos fluidez em reflitir alterações baseada no valor dos inputs
```tsx
const [task, setTask] = useState('')
function handleSubmit(event) {
  event.target.task.value
}

<form onSubmit={handleSubmit}>
  <input name="task" />
</form>
```

## [React hook form](https://react-hook-form.com/get-started)
- Consegue trabalhar com formulários tanto de maneira **CONTROLLED** quanto **UNCONTROLLED**
  - Ou seja, consegue atingir **PERFORMACE** e **FLUIDEZ**
```sh
npm install react-hook-form
```

- Register
  - Adicionar um input ao form
  - Defini os campos que ira ter no form
  - Retorno da função retorna metodos utilizados para trabalhar com inputs no js
    - onChange, onBlur, etc
  - Ao utilizar spread operator deixa esses atributos no próprio input

- watch
  - Utilizado para pegar valores em tempo real de um input

```tsx
const { register, handleSubmit, watch } = useForm()
const task = watch('task')

function handleCreateNewCycle(data) {
  // data retorna os dados do input
  // { input_name: 'Projeto 01' }
  console.log(data)
}

<form onSubmit={handleSubmit(handleCreateNewCycle)}>
  <input {...register('input_name')} />
</form>
```

### Validação com react hook form
- não tem por padrão a própria validação
  - Tem integração com libs de validação como 
    - [yup](https://github.com/jquense/yup)
    - [joi](https://github.com/hapijs/joi) 
    - [zod](https://github.com/colinhacks/zod)

### Usando zod
```sh
npm i zod
npm i @hookform/resolvers
```

```tsx
const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .string()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
})

const { register, handleSubmit, watch, formState } = useForm({
  resolver: zodResolver(newCycleFormValidationSchema),
})

// pegar os erros
console.log(formState.errors)
```

### Pegar tipagem do shema
```tsx
// infer -> automatizar processo de tipagem

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>
const { register, handleSubmit, watch } = useForm<NewCycleFormData>()
```

# Dicas gerais
## Criar Sugestões de inputs
```html
<input
  id="task"
  placeholder="Dê um nome para seu projeto"
  list="task-suggestions"
/>

<datalist id="task-suggestions">
  <option value="Projeto 1" />
  <option value="Projeto 2" />
  <option value="Projeto 3" />
</datalist>
```
- Remover setinha em cima input
```css
input::-webkit-calendar-picker-indicator {
  display: none !important;
}
```

## Tipar valores constantes
```tsx
const STATUS_COLORS = {
  yellow: 'yellow-500',
  green: 'green-500',
  red: 'red-500',
} as const
```