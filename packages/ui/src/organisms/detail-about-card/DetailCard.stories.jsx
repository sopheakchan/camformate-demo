import { DetailCard } from './DetailCard'

export default {
  title: 'Organisms/DetailCard',
  component: DetailCard,
}

const Template = args => <DetailCard {...args} />

export const DefaultDetailCard = Template.bind({})

DefaultDetailCard.args = {
  title: 'Part I',
  content: ['string1', 'string2', 'string3'],
}
