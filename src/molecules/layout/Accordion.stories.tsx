import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './Accordion';

const meta = { title: 'Molecules/Layout/Accordion', tags: ['disclosure'], component: Accordion, decorators: [(Story) => <div style={{ maxWidth: 520 }}><Story /></div>] } satisfies Meta;
export default meta;

export const Single: StoryObj = {
  render: () => (
    <Accordion type="single" collapsible defaultValue="a">
      <AccordionItem value="a"><AccordionTrigger>How is coverage measured?</AccordionTrigger><AccordionContent>Every release runs the full suite on the same machine, three times. The median is reported.</AccordionContent></AccordionItem>
      <AccordionItem value="b"><AccordionTrigger>What counts toward size?</AccordionTrigger><AccordionContent>The minified, compressed entry point and everything it imports.</AccordionContent></AccordionItem>
      <AccordionItem value="c"><AccordionTrigger>How often is it updated?</AccordionTrigger><AccordionContent>On each published version.</AccordionContent></AccordionItem>
    </Accordion>
  ),
};
