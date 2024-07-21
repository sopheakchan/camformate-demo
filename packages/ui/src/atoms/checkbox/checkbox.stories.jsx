import CheckBox from './checkbox'

export default {
  title: 'Atoms/CheckBox',
  component: CheckBox,
}

const Template = args => <CheckBox {...args} />

export const DefaultCheckbox = Template.bind({})

DefaultCheckbox.args = {
  items: [
    { key: 1, label: 'All' },
    { key: 2, label: 'Full Time' },
    { key: 3, label: 'Part Time' },
  ],
  type: 'Schedule',
  setValue: () => console.log('clicked'),
}
