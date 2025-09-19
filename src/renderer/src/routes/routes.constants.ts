import { LucideProps, HomeIcon, BookOpenText } from 'lucide-react'
import { ForwardRefExoticComponent, RefAttributes } from 'react'

export const router = {
  loginScreen: '/',
  registerScreen: '/register',
  homeScreen: '/home',
  schoolGradesScreen: '/school-grades'
}

export interface SideBarsItemI {
  // roles: UserRolesE[];
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
    icon: HomeIcon
  },
  {
    title: 'Grados',
    link: router.schoolGradesScreen,
    icon: BookOpenText
  }
]
