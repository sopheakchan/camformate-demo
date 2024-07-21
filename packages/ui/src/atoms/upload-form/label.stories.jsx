import FormLabel from './label'

export default {
  title: 'Atoms/Upload-Form',
  component: FormLabel,
}

const Template = args => <FormLabel {...args} />

export const UploadLabel = Template.bind({})

UploadLabel.args = {
  title: 'Announcement name',
  subTitle: 'This will display as your announcement name',
}
