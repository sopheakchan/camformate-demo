import { ScholarshipContentCard } from './ScholarshipContentCard'

export default {
  title: 'Organisms/Scholarship',
  component: ScholarshipContentCard,
}

const Template = args => <ScholarshipContentCard {...args} />

export const ScholarshipCard = Template.bind({})

ScholarshipCard.args = {
  onClick: () => alert('clicked'),
  data: {
    id: 1,
    awardAmount: 25000,
    deadline: 'February 28',
    university: 'Cambodia University of Technology',
    content:
      "Applicant must be of Italian heritage and be a full-time student attending or planning on attending an accredited four-year institution who has demonstrated exceptional leadership qualities and a distinguished level of scholastic achievement. Recipients will be officially recognized in May at the SIF's National Education & Leadership Awards (NELA) Gala in Washington, DC. Monetary awards are presented directly to students' academic institutions in accordance with eligibility requirements.",
    location: 'Sen Sok, Phnom Penh',
    college:
      'College junior, College freshman, College senior, College sophomore',
    major: 'All Majors Eligible',
  },
}
