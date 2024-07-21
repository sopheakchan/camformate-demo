import MajorsComponent from './MajorsComponent'
import { FaLongArrowAltRight } from 'react-icons/fa'

export default {
  title: 'Atoms/Major-Components',
  component: MajorsComponent,
}

const Template = args => <MajorsComponent {...args} />

export const MajorMenu = Template.bind({})

MajorMenu.args = {
  faculty: 'Computer Science',
  icon: <FaLongArrowAltRight />,
  item: {
    key: 1,
  },
}
