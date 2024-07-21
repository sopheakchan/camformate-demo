import CardComponent from './CardComponent'
import { SVGIcons } from '../../../../../apps/client/assets'

export default {
  title: 'Organisms/Home/Scholarship',
  component: CardComponent,
}

const Template = args => <CardComponent {...args} />

export const ScholarshipCard = Template.bind({})

ScholarshipCard.args = {
  icon: SVGIcons.LawIcon(),
  title: 'Private',
  subTitle: 'Private Schools',
}
