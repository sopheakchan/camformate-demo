import Typography from './Typography'

export default {
  title: 'Atoms/Typography',
  component: Typography,
}

const Template = args => <Typography {...args} />

export const DefaultTypography = Template.bind({})

DefaultTypography.args = {
  size: 'md',
  color: 'text-primary',
  children: 'This is text',
  fontWeight: 'normal',
}
