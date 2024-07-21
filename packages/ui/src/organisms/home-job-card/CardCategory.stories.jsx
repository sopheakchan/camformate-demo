import { HomeJobCard } from './CardCategory'
import { SVGIcons } from '../../../../../apps/client/assets'

export default {
  title: 'Organisms/Home/Job',
  component: HomeJobCard,
}

const Template = args => <HomeJobCard {...args} />

export const JobCards = Template.bind({})

JobCards.args = {
  items: [
    {
      icon: SVGIcons.ITIcon(),
      title: 'Information Technology',
      subTitle: 'Recruitments',
      amount: 20,
      link: 'IT',
    },
    {
      icon: SVGIcons.ArchitectIcon(),
      title: 'Architecture & Construction',
      subTitle: 'Recruitments',
      amount: 20,
      link: 'architecture',
    },
    {
      icon: SVGIcons.BusinessIcon(),
      title: 'Business & Finance',
      subTitle: 'Recruitments',
      amount: 20,
      link: 'business',
    },
    {
      icon: SVGIcons.EducationIcon(),
      title: 'Education & Training',
      subTitle: 'Recruitments',
      amount: 20,
      link: 'education',
    },
    {
      icon: SVGIcons.LawIcon(),
      title: 'Law',
      subTitle: 'Recruitments',
      amount: 20,
      link: 'law',
    },
    {
      icon: SVGIcons.MarketingIcon(),
      title: 'Marketing',
      subTitle: 'Recruitments',
      amount: 20,
      link: 'marketing',
    },
    {
      icon: SVGIcons.HealthIcon(),
      title: 'Health Science',
      subTitle: 'Recruitments',
      amount: 20,
      link: 'health',
    },
    {
      icon: SVGIcons.GovernmentIcon(),
      title: 'Goverment & Admistration',
      subTitle: 'Recruitments',
      amount: 20,
      link: 'government',
    },
  ],
}
