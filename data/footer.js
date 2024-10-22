import { Behance, Facebook, Github, LinkedIn } from './svgImages'
export const FooterData = {
  logo: '/images/logo_svg_black.svg',
  logoDark: '/images/logo_svg_white.svg',
  footerText: 'Turpis tortor nunc sed amet et faucibus vitae morbi congue sed id mauris.',
  copyright: `${new Date().getFullYear()} aivalanche. All Rights Reserved`,
  email: 'support@aivalanche.de',
  phone: '+3 230 705 5448',
  expolre: [
    {
      id: 1,
      name: 'About',
      link: '/about',
    },
    {
      id: 2,
      name: 'Solutions',
      link: '/services',
    },
    {
      id: 3,
      name: 'Industry',
      link: '/career',
    },
    {
      id: 4,
      name: 'Contact Us',
      link: '/home-2',
    },

  ],
  resources: [
    {
      id: 1,
      name: 'Banking',
      link: '/home-3',
    },
    {
      id: 2,
      name: 'Team',
      link: '/teams',
    },
    {
      id: 3,
      name: 'Integration',
      link: '/integration',
    },
    {
      id: 4,
      name: 'Blog',
      link: '/blog',
    },
    {
      id: 5,
      name: 'Log In',
      link: '/login',
    },
    {
      id: 6,
      name: 'Sign Up',
      link: '/signup',
    },
    {
      id: 7,
      name: '404',
      link: '/not-found',
    },
  ],

  socialLinks: [
    {
      id: 1,
      name: <Facebook />,
      link: '#',
    },
    // {
    //   id: 2,
    //   name: <Github />,
    //   link: '#',
    // },
    {
      id: 3,
      name: <LinkedIn />,
      link: '#',
    },

  ],
}
