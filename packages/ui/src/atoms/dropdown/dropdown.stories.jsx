import Dropdown from './dropdown'

export default {
  title: 'Atoms/Dropdown',
  component: Dropdown,
}

const Template = args => <Dropdown {...args} />

export const DefaultDropdown = Template.bind({})

DefaultDropdown.args = {
  items: [
    {
      key: 1,
      label: 'Test1',
    },
    {
      key: 2,
      label: 'Test2',
    },
    {
      key: 3,
      label: 'Test3',
    },
  ],
  placeholder: 'Select Category',
}
