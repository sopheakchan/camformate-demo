import Shape from './Shape'

export default {
  title: 'Atoms/Shape',
  component: Shape,
}

const Template = args => <Shape {...args} />

export const DefaultShape = Template.bind({})

DefaultShape.args = {
  children: 'testing shape',
  location: 'bottom',
  radius: 'md',
  width: 'md',
  height: 'md',
  color: 'primary',
}
