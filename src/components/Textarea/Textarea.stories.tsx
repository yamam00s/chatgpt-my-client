import { StoryFn, Meta } from '@storybook/react';

import { Textarea, TextareaProps } from './Textarea';

export default {
  title: 'Components/Textarea',
  component: Textarea
} as Meta<TextareaProps>;

const Template: StoryFn<TextareaProps> = args => {return <Textarea {...args} />};

export const Default = Template.bind({});
Default.args = {
  value: '',
  onChange: () => {return undefined}
};
