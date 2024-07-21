import MajorImage from './MajorImage'
import { Images } from '../../../../../apps/client/assets'

export default {
  title: 'Atoms/Major-Components',
  component: MajorImage,
}

const Template = args => <MajorImage {...args} />

export const MajorImageBox = Template.bind({})

MajorImageBox.args = {
  img: Images.ForgotPasswordImage,
  name: 'Sad Content',
  cost: [
    { year: 'Freshman', price: '500$' },
    { year: 'Freshman', price: '500$' },
    { year: 'Freshman', price: '500$' },
    { year: 'Freshman', price: '500$' },
  ],
}
