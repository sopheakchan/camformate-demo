import FormTextArea from './textarea'

export default {
  title: 'Atoms/Upload-Form',
  component: FormTextArea,
}

const Template = args => <FormTextArea {...args} />

export const UploadTextArea = Template.bind({})

UploadTextArea.args = {
  placeholder: 'Description',
  size: 'description',
  maxLength: 200,
}
