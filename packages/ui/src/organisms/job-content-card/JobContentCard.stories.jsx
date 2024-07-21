import { JobContentCard } from './JobContentCard'

export default {
  title: 'Organisms/Job',
  component: JobContentCard,
}

const Template = args => <JobContentCard {...args} />

export const JobCard = Template.bind({})

JobCard.args = {
  allItems: {
    id: 1,
    title: 'SabaiCode',
    subTitle: 'Frontend Engineer and Backend Engineer',
    deadline: 'Dec 1,2022',
    salary: '$550',
    schedule: 'Full-Time',
    location: 'Phnom Penh',
    description: `Working with us to improve your programming skills and also communication skills. Working with no pressure is what
      we provide to our employees`,
  },
}
