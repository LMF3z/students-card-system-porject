import { ForwardRefExoticComponent, RefAttributes } from 'react'
import { LucideProps, HomeIcon, BookOpenText, Users } from 'lucide-react'
import { UserRoles } from '@renderer/internal/interface'

export const router = {
  loginScreen: '/',
  registerScreen: '/register',
  homeScreen: '/home',
  teachersScreen: '/teachers',
  schoolGradesScreen: '/school-grades'
}

export interface SideBarsItemI {
  roles: UserRoles[]
  icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>

  title: string
  link: string
  // collapse: boolean;
  // children?: SideBarsItemI[];
}

export const drawerRoutes: SideBarsItemI[] = [
  {
    title: 'Inicio',
    link: router.homeScreen,
    icon: HomeIcon,
    roles: [UserRoles.SUPER_ADMIN, UserRoles.ADMIN, UserRoles.TEACHER]
  },
  {
    title: 'Profesores',
    link: router.teachersScreen,
    icon: Users,
    roles: [UserRoles.SUPER_ADMIN, UserRoles.ADMIN]
  },
  {
    title: 'Grados',
    link: router.schoolGradesScreen,
    icon: BookOpenText,
    roles: [UserRoles.SUPER_ADMIN, UserRoles.ADMIN, UserRoles.TEACHER]
  }
]
