import { styled } from '../utils/styled';
import './Table.css';

/** Bare table parts for hand-built tables. For data with columns, use DataTable. */
export const Table = styled('table', 'gl-table');
export const TableHeader = styled('thead', 'gl-table__head');
export const TableBody = styled('tbody', 'gl-table__body');
export const TableFooter = styled('tfoot', 'gl-table__foot');
export const TableRow = styled('tr', 'gl-table__row');
export const TableHead = styled('th', 'gl-table__th');
export const TableCell = styled('td', 'gl-table__td');
export const TableCaption = styled('caption', 'gl-table__caption');
