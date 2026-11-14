import { ToggleGroup as Base } from 'radix-ui';
import { styled } from '../utils/styled';
import './ToggleGroup.css';
import './ButtonGroup.css';

/** Toggles joined into one control. `type="single"` behaves like a segmented switch. */
export const ToggleGroup = styled(Base.Root, 'gl-button-group gl-button-group--horizontal');
export const ToggleGroupItem = styled(Base.Item, 'gl-toggle-item');
