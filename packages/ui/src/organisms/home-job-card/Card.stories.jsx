import Card from './Card'
import { SVGIcons } from '../../../../../apps/client/assets'

export default {
  title: 'Organisms/Home/Job',
  component: Card,
}

const Template = args => <Card {...args} />

export const JobCard = Template.bind({})

JobCard.args = {
  icon: SVGIcons.ITIcon(),
  title: 'Computer Science',
  subTitle: 'Recruitments',
  amount: 100,
}
