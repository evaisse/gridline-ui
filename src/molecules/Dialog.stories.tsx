import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, Input, Text } from '../atoms';
import {
  AlertDialog, AlertDialogContent, AlertDialogTrigger, Dialog, DialogBody, DialogClose, DialogContent, DialogFooter, DialogTrigger,
  Drawer, DrawerContent, DrawerTrigger, Sheet, SheetContent, SheetTrigger,
} from './Dialog';
import { Field } from './Field';

const meta = { title: 'Molecules/Dialog', component: Dialog, parameters: { layout: 'centered' } } satisfies Meta<typeof Dialog>;
export default meta;
type Story = StoryObj<typeof meta>;

const form = <Field label="Package name" description="You can rename it later.">{(ids) => <Input {...ids} defaultValue="tessera" />}</Field>;

export const Modal: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger asChild><Button>Rename package</Button></DialogTrigger>
      <DialogContent title="Rename package" description="The old name keeps redirecting for 30 days.">
        <DialogBody>{form}</DialogBody>
        <DialogFooter><DialogClose asChild><Button>Cancel</Button></DialogClose><Button variant="solid">Rename</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
export const ModalOpen: Story = { ...Modal, args: { defaultOpen: true }, decorators: [(Story) => <div style={{ width: 600, height: 380 }}><Story /></div>] };

export const SheetRight: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild><Button>Open filters</Button></SheetTrigger>
      <SheetContent title="Filters" description="Narrow the catalogue."><DialogBody>{form}</DialogBody><DialogFooter><Button variant="solid">Apply</Button></DialogFooter></SheetContent>
    </Sheet>
  ),
};

export const DrawerBottom: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild><Button>Open drawer</Button></DrawerTrigger>
      <DrawerContent title="Share"><DialogBody><Text>Rises from the bottom edge. Best on narrow screens.</Text></DialogBody></DrawerContent>
    </Drawer>
  ),
};

export const Confirm: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild><Button>Delete package</Button></AlertDialogTrigger>
      <AlertDialogContent title="Delete tessera?" description="This removes all 42 versions. It cannot be undone." confirmLabel="Delete" />
    </AlertDialog>
  ),
};
