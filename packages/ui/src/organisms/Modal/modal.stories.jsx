import { MyModal } from './modal'

export default {
  title: 'Organisms/Modal',
  component: MyModal,
}

const Template = args => <MyModal {...args} />

export const Modal = Template.bind({})

Modal.args = {
  children: 'This is my modal',
  onClose: () => alert('Closed'),
  show: true,
}
