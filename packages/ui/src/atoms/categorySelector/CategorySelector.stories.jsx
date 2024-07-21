import CategorySelector from './CategorySelector'

export default {
  title: 'Atoms/CategorySelector',
  component: CategorySelector,
}

const Template = args => <CategorySelector {...args} />

export const DefaultCategorySelector = Template.bind({})

DefaultCategorySelector.args = {
  categoryName: [
    { key: 1, label: 'Front-End' },
    { key: 2, label: 'Back-End' },
    { key: 3, label: 'UX/UI' },
  ],
}
