import { ChakraProvider } from '@chakra-ui/react'
import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './router/AppRoutes'
import { useCourseStore } from './shared/store/useClasesStore'

const App = () => {
  const fetchClasses = useCourseStore((s) => s.fetchClasses)

  useEffect(() => {
    fetchClasses()
  }, [fetchClasses])

  return (
    <BrowserRouter>
      <ChakraProvider>
        <AppRoutes />
      </ChakraProvider>
    </BrowserRouter>
  )
}

export default App
