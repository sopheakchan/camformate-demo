import { Navbar } from './index'

export default {
  title: 'Organisms/Navbar',
  component: Navbar,
}

const Template = args => <Navbar {...args} />

export const NavigationBar = Template.bind({})

NavigationBar.parameters = {
  nextRouter: {
    path: ['/', '/scholarship', '/job', '/info'],
    asPath: '/',
    query: {
      id: 'lifeiscontent',
    },
  },
}
