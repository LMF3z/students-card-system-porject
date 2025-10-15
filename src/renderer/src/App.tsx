import { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppLayout } from './presentation/components/layouts/AppLayout'
import { router } from './routes/routes.constants'
import { PrivateRoute, PublicRoute } from './presentation/components'
import {
  HomeScreen,
  LoginScreen,
  RegisterScreen,
  RepresentativeScreen,
  SchoolGradesScreen,
  StudentsScreen,
  TeachersScreen
} from './presentation/screens'
import { ElectronSuccessAndErrorContextProvider } from './internal/hooks'

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ElectronSuccessAndErrorContextProvider>
        <BrowserRouter>
          <AppLayout>
            <Routes>
              <Route element={<PublicRoute />}>
                <Route index path={router.loginScreen} element={<LoginScreen />} />
                <Route path={router.registerScreen} element={<RegisterScreen />} />
              </Route>

              <Route element={<PrivateRoute />}>
                <Route path={router.homeScreen} element={<HomeScreen />} />
                <Route path={router.teachersScreen} element={<TeachersScreen />} />
                <Route path={router.representativesScreen} element={<RepresentativeScreen />} />
                <Route path={router.schoolGradesScreen} element={<SchoolGradesScreen />} />

                <Route path={router.studentsScreen} element={<StudentsScreen />} />
              </Route>

              <Route path="*" element={<LoginScreen />} />
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </ElectronSuccessAndErrorContextProvider>
    </Suspense>
  )
}

export default App
