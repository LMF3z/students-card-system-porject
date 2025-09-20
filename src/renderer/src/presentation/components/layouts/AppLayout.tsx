import { useState, type ReactNode } from 'react'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import { Toaster } from 'react-hot-toast'
import { ArrowLeft, ChevronLeftIcon, ChevronRightIcon, MenuIcon, LogOut } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { styled, useTheme } from '@mui/material/styles'
import MuiAppBar, { type AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Drawer from '@mui/material/Drawer'
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'

import { drawerRoutes, router } from '../../../routes/routes.constants'
import { useAuthStore } from '../../../internal/store'

const drawerWidth = 240

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({ theme }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen
        })
      }
    }
  ]
}))
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean
}>(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  marginLeft: `-${drawerWidth}px`,
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0
      }
    }
  ]
}))

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end'
}))

export const AppLayout = ({ children }: { children: ReactNode }) => {
  const { isAuth, removeAuth } = useAuthStore()

  const location = useLocation()
  const navigate = useNavigate()
  const theme = useTheme()

  const [open, setOpen] = useState(false)

  const toggleDrawerOpen = () => {
    setOpen(!open)
  }

  const handleSignOut = () => {
    removeAuth()
    navigate(router.loginScreen)
  }

  return (
    <>
      {![router.loginScreen, router.homeScreen].includes(location.pathname) && (
        <div className="w-10 lg:w-20 h-10 lg:h-20 flex justify-center items-center absolute top-0 left-0 bg-transparent">
          <ArrowLeft className="cursor-pointer" onClick={() => navigate(-1)} />
        </div>
      )}

      {isAuth && (
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position="fixed" open={open}>
            <Toolbar className="flex justify-between items-center">
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawerOpen}
                edge="start"
                sx={[
                  {
                    mr: 2
                  }
                ]}
              >
                <MenuIcon />
              </IconButton>

              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleSignOut}
                edge="end"
                sx={[
                  {
                    mr: 0
                  }
                ]}
              >
                <LogOut />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box'
              }
            }}
            variant="persistent"
            anchor="left"
            open={open}
          >
            <DrawerHeader>
              <IconButton onClick={toggleDrawerOpen}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </DrawerHeader>

            <List>
              {drawerRoutes.map(({ title, link, icon: Icon, roles }) => {
                if (!roles.includes(isAuth.role)) return null

                return (
                  <Link to={link} key={title}>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <Icon />{' '}
                        </ListItemIcon>
                        <ListItemText primary={title} />
                      </ListItemButton>
                    </ListItem>
                  </Link>
                )
              })}
            </List>
          </Drawer>

          <Main open={open}>
            <DrawerHeader />
            {children}
          </Main>
        </Box>
      )}

      {!isAuth && <>{children}</>}
      <Toaster />
    </>
  )
}
