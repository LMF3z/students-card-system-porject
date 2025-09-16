import { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppLayout } from './presentation/components/layouts/AppLayout'
import { router } from './routes/routes.constants'
import { PrivateRoute, PublicRoute } from './presentation/components'
import { HomeScreen, LoginScreen, RegisterScreen } from './presentation/screens'
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
              </Route>

              <Route path="*" element={<LoginScreen />} />
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </ElectronSuccessAndErrorContextProvider>
    </Suspense>
  )

  // return (
  //   <>
  //     <img alt="logo" className="logo" src={electronLogo} />
  //     <div className="creator">Powered by electron-vite</div>
  //     <div className="text">
  //       Build an Electron app with <span className="react">React</span>
  //       &nbsp;and <span className="ts">TypeScript</span>
  //     </div>
  //     <p className="tip">
  //       Please try pressing <code>F12</code> to open the devTool
  //     </p>
  //     <div className="actions">
  //       <div className="action">
  //         <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">
  //           Documentation
  //         </a>
  //       </div>
  //       <div className="action">
  //         <a target="_blank" rel="noreferrer" onClick={ipcHandle}>
  //           Send IPC
  //         </a>
  //       </div>
  //     </div>
  //   </>
  // )
}

export default App
