import type { Meta, StoryObj } from '@storybook/react-vite';
import { NavigationMenu, NavigationMenuCard, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuTrigger } from './NavigationMenu';

const meta = { title: 'Organisms/Navigation/NavigationMenu', tags: ['menu', 'wayfinding'], component: NavigationMenu, decorators: [(Story) => <div style={{ minHeight: 240 }}><Story /></div>] } satisfies Meta<typeof NavigationMenu>;
export default meta;

export const Default: StoryObj<typeof meta> = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Benchmarks</NavigationMenuTrigger>
        <NavigationMenuContent>
          <NavigationMenuCard href="#" title="Coverage" description="Share of lines exercised by the suite." />
          <NavigationMenuCard href="#" title="Size" description="Compressed entry point, in kilobytes." />
          <NavigationMenuCard href="#" title="Build time" description="Cold build on the reference machine." />
          <NavigationMenuCard href="#" title="All benchmarks" description="42 measures across five categories." />
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem><NavigationMenuLink href="#" active>Packages</NavigationMenuLink></NavigationMenuItem>
      <NavigationMenuItem><NavigationMenuLink href="#">Compare</NavigationMenuLink></NavigationMenuItem>
      <NavigationMenuItem><NavigationMenuLink href="#">About</NavigationMenuLink></NavigationMenuItem>
    </NavigationMenu>
  ),
};
