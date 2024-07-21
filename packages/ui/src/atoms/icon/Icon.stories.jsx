import Icon from './Icon'
import { AiFillAlert } from 'react-icons/ai'

export default {
  title: 'Atoms/Icon',
  component: Icon,
}

const Template = args => <Icon {...args} />

export const DefaultIcon = Template.bind({})

DefaultIcon.args = {
  icon: <AiFillAlert />,
  size: 'xs',
  color: 'primary',
  onClick: () => alert('Clicked'),
}
