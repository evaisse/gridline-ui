import { Group, Panel, Separator } from 'react-resizable-panels';
import { styled } from '../../utils/styled';
import './Resizable.css';

/** Panels divided by a draggable hairline. */
export const ResizableGroup = styled(Group, 'gl-resizable');
export const ResizablePanel = Panel;
export const ResizableHandle = styled(Separator, 'gl-resizable__handle');
