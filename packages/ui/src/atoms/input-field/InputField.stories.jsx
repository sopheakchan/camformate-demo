import InputField from './InputField'
import withFormik from '@bbbtech/storybook-formik'

export default {
  title: 'Atoms/InputField',
  component: InputField,
  decorator: [withFormik],
}

const Template = args => <InputField {...args} />

export const DefaultInputField = Template.bind({})

DefaultInputField.args = {
  name: 'name',
  label: 'name',
  size: 'md',
  placeholder: 'Enter name',
}
