import { InfoCard } from './InfoCard'
import { Images } from '../../../../../apps/client/assets'

export default {
  title: 'Organisms/Info',
  component: InfoCard,
}

const Template = args => <InfoCard {...args} />

export const InfoCardContent = Template.bind({})

InfoCardContent.args = {
  data: {
    id: 1,
    name: 'International School',
    specialty: 'Fuculty of International Relationships',
    location: 'Phnom Penh',
    image: Images.Students,
    rating: 4,
    website: 'www.example.com',
  },
}
