import { Filter } from './filter'
import { SVGIcons } from '../../../../../apps/client/assets'

export default {
  title: 'Organisms/Filter',
  component: Filter,
}

const Template = args => <Filter {...args} />

export const DefaultFilter = Template.bind({})

DefaultFilter.args = {
  items: [
    {
      placeholder: 'Academic Year',
      name: 'academicYear',
      icon: SVGIcons.AcademicIcon(),
    },
    {
      placeholder: 'Location',
      name: 'location',
      icon: SVGIcons.LocationIcon(),
    },
    {
      placeholder: 'Salary Range',
      name: 'salaryRange',
      icon: SVGIcons.DollarIcon(),
    },
    {
      placeholder: 'Industry',
      name: 'industry',
      icon: SVGIcons.IndustryIcon(),
    },
  ],
  initialValues: {
    academicYear: '',
    location: '',
    salaryRange: '',
    industry: '',
  },
  className: 'w-[80%]',
}
