import type { SVGProps } from 'react';

/** Gridline glyphs: 16px box, 1.25px stroke, square caps. They inherit `currentColor`. */
function glyph(d: string, name: string) {
  function Icon(props: SVGProps<SVGSVGElement>) {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="square" aria-hidden="true" {...props}>
        <path d={d} />
      </svg>
    );
  }
  Icon.displayName = name;
  return Icon;
}

export const CheckIcon = glyph('M3 8.5l3.2 3L13 4.5', 'CheckIcon');
export const XIcon = glyph('M4 4l8 8M12 4l-8 8', 'XIcon');
export const ChevronDownIcon = glyph('M4 6l4 4 4-4', 'ChevronDownIcon');
export const ChevronUpIcon = glyph('M4 10l4-4 4 4', 'ChevronUpIcon');
export const ChevronRightIcon = glyph('M6 4l4 4-4 4', 'ChevronRightIcon');
export const ChevronLeftIcon = glyph('M10 4L6 8l4 4', 'ChevronLeftIcon');
export const PlusIcon = glyph('M8 3v10M3 8h10', 'PlusIcon');
export const MinusIcon = glyph('M3 8h10', 'MinusIcon');
export const SearchIcon = glyph('M7 12A5 5 0 107 2a5 5 0 000 10zM11 11l3 3', 'SearchIcon');
export const CopyIcon = glyph('M5.5 5.5h8v8h-8zM2.5 10.5v-8h8', 'CopyIcon');
export const RefreshIcon = glyph('M13 8a5 5 0 11-1.5-3.5M13 2.5v3h-3', 'RefreshIcon');
export const ArrowUpIcon = glyph('M8 13V3M4 7l4-4 4 4', 'ArrowUpIcon');
export const ArrowDownIcon = glyph('M8 3v10M4 9l4 4 4-4', 'ArrowDownIcon');
export const ArrowRightIcon = glyph('M3 8h10M9 4l4 4-4 4', 'ArrowRightIcon');
export const MoreIcon = glyph('M3.5 8h.01M8 8h.01M12.5 8h.01', 'MoreIcon');
export const PaperclipIcon = glyph('M12.5 7.5l-5 5a3 3 0 01-4-4l6-6a2 2 0 013 3l-6 6a1 1 0 01-1.500-1.5l5-5', 'PaperclipIcon');
export const FileIcon = glyph('M4 2h5l3 3v9H4zM9 2v3h3', 'FileIcon');
export const StopIcon = glyph('M4.5 4.5h7v7h-7z', 'StopIcon');
export const PencilIcon = glyph('M3 13l1-3.500 7-7 2.500 2.500-7 7zM9.500 4l2.500 2.500', 'PencilIcon');
export const TrashIcon = glyph('M3 4.5h10M6 4.5v-2h4v2M4.5 4.5l.5 9h6l.5-9', 'TrashIcon');
export const ThumbUpIcon = glyph('M2.500 7.500h2.500v6H2.500zM5 7.500l3-5a1.500 1.500 0 011.500 1.500v2.500h3.500l-1 7H5', 'ThumbUpIcon');
export const ThumbDownIcon = glyph('M2.500 8.500h2.500v-6H2.500zM5 8.500l3 5a1.500 1.500 0 001.500-1.500V9.500h3.500l-1-7H5', 'ThumbDownIcon');
export const SparkIcon = glyph('M8 2v12M2 8h12M4 4l8 8M12 4l-8 8', 'SparkIcon');
export const PanelIcon = glyph('M2.500 3h11v10h-11zM6 3v10', 'PanelIcon');
export const CalendarIcon = glyph('M2.500 3.500h11v10h-11zM2.500 6.500h11M5.500 2v3M10.500 2v3', 'CalendarIcon');
export const TerminalIcon = glyph('M2.500 3h11v10h-11zM5 6.500L7 8.500 5 10.500M8.500 10.500h2.500', 'TerminalIcon');
export const GlobeIcon = glyph('M8 14A6 6 0 108 2a6 6 0 000 12zM2 8h12M8 2c2 2 2 10 0 12M8 2c-2 2-2 10 0 12', 'GlobeIcon');
export const ChatIcon = glyph('M2.500 3h11v8H7l-3 2.500V11H2.500z', 'ChatIcon');
export const SortIcon = glyph('M5 6l3-3 3 3M5 10l3 3 3-3', 'SortIcon');
export const InfoIcon = glyph('M8 14A6 6 0 108 2a6 6 0 000 12zM8 7.500v3.500M8 5h.01', 'InfoIcon');
export const AlertIcon = glyph('M8 2.500l6 10.500H2zM8 6.500v3M8 11.500h.01', 'AlertIcon');
export const GripIcon = glyph('M6 3.500h.01M10 3.500h.01M6 8h.01M10 8h.01M6 12.500h.01M10 12.500h.01', 'GripIcon');
export const QuoteIcon = glyph('M3 9V6.500A2.500 2.500 0 015.500 4M3 9h3v3H3zM9 9V6.500A2.500 2.500 0 0111.500 4M9 9h3v3H9z', 'QuoteIcon');
export const EyeIcon = glyph('M1.500 8S4 3.500 8 3.500 14.500 8 14.500 8 12 12.500 8 12.500 1.500 8 1.500 8zM8 10a2 2 0 100-4 2 2 0 000 4z', 'EyeIcon');
export const EyeOffIcon = glyph('M2.500 2.500l11 11M6.500 4A6 6 0 018 3.500c4 0 6.500 4.500 6.500 4.500a11 11 0 01-2 2.500M10 12a6 6 0 01-2 .500C4 12.500 1.500 8 1.500 8a11 11 0 012.500-3', 'EyeOffIcon');
export const UploadIcon = glyph('M8 10.500V2.500M4.500 6L8 2.500 11.500 6M2.500 10.500v3h11v-3', 'UploadIcon');
export const StarIcon = glyph('M8 2l1.800 3.800 4.200.500-3.100 2.900.800 4.100L8 11.300l-3.700 2 .800-4.100L2 6.300l4.200-.500z', 'StarIcon');
export const FolderIcon = glyph('M2.500 4h4l1.500 1.500h5.500v7.500h-11z', 'FolderIcon');
export const UserIcon = glyph('M8 8a2.500 2.500 0 100-5 2.500 2.500 0 000 5zM3 13.500c0-2.500 2-4 5-4s5 1.500 5 4', 'UserIcon');
export const MenuIcon = glyph('M2.500 4.500h11M2.500 8h11M2.500 11.500h11', 'MenuIcon');
