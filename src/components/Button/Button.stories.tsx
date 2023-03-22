import { StoryFn, Meta } from '@storybook/react'
import { Button, ButtonProps } from './Button'

export default {
  title: 'Components/Button',
  component: Button
} as Meta<ButtonProps>

const Template: StoryFn<ButtonProps> = (args) => <Button {...args}/>

export const Primary = Template.bind({})
Primary.args = {
  children: 'Primary Button'
}

export const Disabled = Template.bind({})
Disabled.args = {
  children: 'Primary Button',
  disabled: true
}
