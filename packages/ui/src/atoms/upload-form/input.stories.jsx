import FormInput from './input'

export default {
  title: 'Atoms/Upload-Form',
  component: FormInput,
}

const Template = args => <FormInput {...args} />

export const UploadInput = Template.bind({})

UploadInput.args = {
  type: 'text',
  border: true,
  placeholder: 'Enter announcement name',
  size: 'lg',
}
