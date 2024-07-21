import Card from './Card'

export default {
  title: 'Organisms/Home/Info',
  component: Card,
}

const Template = args => <Card {...args} />

export const InfoCard = Template.bind({})

InfoCard.args = {
  children: 'School',
}
