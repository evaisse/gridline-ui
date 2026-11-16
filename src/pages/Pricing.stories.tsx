import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button, Heading, Label, Text } from '../atoms';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, ToggleGroup, ToggleGroupItem } from '../molecules';
import { Footer, PricingTable, TopBar } from '../organisms';
import { PricingTemplate } from '../templates';
import { CheckIcon } from '../tokens/icons';

const links = [{ id: 'catalogue', label: 'Catalogue' }, { id: 'method', label: 'Method' }, { id: 'pricing', label: 'Pricing' }, { id: 'docs', label: 'Docs' }];
const features: Array<[string, boolean | string, boolean | string, boolean | string]> = [
  ['Public packages', 'Unlimited', 'Unlimited', 'Unlimited'],
  ['Private packages', false, '50', 'Unlimited'],
  ['Measurements', 'Weekly', 'Every release', 'Every release'],
  ['Regression alerts', false, true, true],
  ['Single sign-on', false, false, true],
  ['Self-hosted runners', false, false, true],
  ['Support', 'Community', 'Priority', 'Named contact'],
];
const cell = (value: boolean | string) => (value === true ? <CheckIcon aria-label="Included" /> : value === false ? <Label size="xs">—</Label> : value);
const columns = [{ title: 'Product', links: [{ label: 'Catalogue', href: '#' }, { label: 'Alerts', href: '#' }, { label: 'Pricing', href: '#' }] }, { title: 'Developers', links: [{ label: 'Documentation', href: '#' }, { label: 'API reference', href: '#' }, { label: 'Status', href: '#' }] }, { title: 'Company', links: [{ label: 'About', href: '#' }, { label: 'Method', href: '#' }, { label: 'Contact', href: '#' }] }];

function Pricing() {
  const [billing, setBilling] = useState('year');
  const team = billing === 'year' ? '20' : '24';
  const plans = [
    { id: 'open', name: 'Open', price: '0', period: 'For public packages', features: ['Unlimited public packages', 'Weekly measurements', 'Community support'], action: <Button>Start free</Button> },
    { id: 'team', name: 'Team', price: team, period: `Per seat, per month, billed ${billing === 'year' ? 'yearly' : 'monthly'}`, features: ['Private packages', 'Measurements on every release', 'Regression alerts', 'Priority support'], action: <Button variant="solid">Try for 14 days</Button>, featured: true },
    { id: 'org', name: 'Organisation', price: '—', period: 'Annual contract', features: ['Single sign-on', 'Self-hosted runners', 'Audit log', 'Named contact'], action: <Button>Contact us</Button> },
  ];
  return (
    <PricingTemplate
      nav={<TopBar brand="◆ Gridline Registry" links={links} current="pricing" actions={<><Button size="sm">Sign in</Button><Button size="sm" variant="solid">Get started</Button></>} />}
      header={
        <>
          <Heading level={1} size="2xl">Free for public code. Per seat for the rest.</Heading>
          <Text variant="lead">Every plan measures your packages the same way. You pay for privacy, frequency and support.</Text>
          <ToggleGroup type="single" value={billing} onValueChange={(value: string) => value && setBilling(value)} aria-label="Billing period">
            <ToggleGroupItem value="month">Monthly</ToggleGroupItem><ToggleGroupItem value="year">Yearly · 2 months free</ToggleGroupItem>
          </ToggleGroup>
        </>
      }
      plans={<PricingTable plans={plans} />}
      comparison={
        <Table>
          <TableHeader><TableRow><TableHead>Feature</TableHead><TableHead>Open</TableHead><TableHead>Team</TableHead><TableHead>Organisation</TableHead></TableRow></TableHeader>
          <TableBody>{features.map(([name, open, mid, org]) => <TableRow key={name}><TableCell>{name}</TableCell><TableCell>{cell(open)}</TableCell><TableCell>{cell(mid)}</TableCell><TableCell>{cell(org)}</TableCell></TableRow>)}</TableBody>
        </Table>
      }
      faq={
        <div style={{ display: 'grid', gap: 16, maxWidth: 720 }}>
          <Heading level={2} size="xl">Questions</Heading>
          <Accordion type="single" collapsible defaultValue="a">
            <AccordionItem value="a"><AccordionTrigger>What counts as a seat?</AccordionTrigger><AccordionContent>Anyone who can publish or see private packages. People who only install do not need one.</AccordionContent></AccordionItem>
            <AccordionItem value="b"><AccordionTrigger>Can I change plan during the year?</AccordionTrigger><AccordionContent>Yes. Seats added mid-period are billed for the days that remain.</AccordionContent></AccordionItem>
            <AccordionItem value="c"><AccordionTrigger>Do sources leave my runners?</AccordionTrigger><AccordionContent>No. Runners send back measurements only.</AccordionContent></AccordionItem>
          </Accordion>
        </div>
      }
      footer={<Footer brand="◆ Gridline Registry" note="Measured packages for data-dense teams." columns={columns} legal="© 2026 Gridline · invented company, invented prices" />}
    />
  );
}

const meta = { title: 'Pages/Pricing', component: Pricing, parameters: { layout: 'fullscreen' } } satisfies Meta<typeof Pricing>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
