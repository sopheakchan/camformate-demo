import { HomeInfoCards } from './HomeInfoCards'

export default {
  title: 'Organisms/Home/Info',
  component: HomeInfoCards,
}

const Template = args => <HomeInfoCards {...args} />

export const InfoCards = Template.bind({})
