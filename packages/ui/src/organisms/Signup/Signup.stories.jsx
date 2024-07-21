import { SignUp } from './Signup'

export default {
  title: 'Organisms/SignUp',
  component: SignUp,
}

const Template = args => <SignUp {...args} />

export const SignUpCard = Template.bind({})

SignUpCard.parameters = {
  nextRouter: {
    path: '/profile/[id]',
    asPath: '/profile/lifeiscontent',
    query: {
      id: 'lifeiscontent',
    },
  },
}
