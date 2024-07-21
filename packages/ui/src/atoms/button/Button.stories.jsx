import Button from './Button'
import { AiOutlineArrowRight } from 'react-icons/ai'

export default {
  title: 'Atoms/Button',
  component: Button,
}

const Template = args => <Button {...args} />

export const DefaultButton = Template.bind({})
DefaultButton.args = {
  children: 'click me',
  variant: 'contained',
  size: 'md',
  intent: 'primary',
}

export const ButtonWithIcon = Template.bind({})
ButtonWithIcon.args = {
  ...DefaultButton.args,
  icon: <AiOutlineArrowRight />,
  // iconAppearance: 'text-white',
}
