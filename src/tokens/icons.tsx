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
export const PlayIcon = glyph('M5 3.500v9l7-4.500z', 'PlayIcon');
export const PauseIcon = glyph('M5 3.500v9M11 3.500v9', 'PauseIcon');
export const ClockIcon = glyph('M8 14A6 6 0 108 2a6 6 0 000 12zM8 5v3.500l2.500 1.500', 'ClockIcon');
export const ImageIcon = glyph('M2.500 3h11v10h-11zM2.500 11l3.500-3.500 3 3 2-2 2.500 2.500M10.500 6h.01', 'ImageIcon');
export const PinIcon = glyph('M8 14.500s4.500-4 4.500-7.500a4.500 4.500 0 10-9 0c0 3.500 4.500 7.500 4.500 7.500zM8 8.500a1.500 1.500 0 100-3 1.500 1.500 0 000 3z', 'PinIcon');
export const ZoomInIcon = glyph('M7 12A5 5 0 107 2a5 5 0 000 10zM11 11l3 3M7 5v4M5 7h4', 'ZoomInIcon');
export const ZoomOutIcon = glyph('M7 12A5 5 0 107 2a5 5 0 000 10zM11 11l3 3M5 7h4', 'ZoomOutIcon');
export const BoldIcon = glyph('M4.500 3h4a2.500 2.500 0 010 5h-4zM4.500 8h5a2.500 2.500 0 010 5h-5z', 'BoldIcon');
export const ItalicIcon = glyph('M7 3h5M4 13h5M9.500 3l-3 10', 'ItalicIcon');
export const UnderlineIcon = glyph('M4.500 3v4.500a3.500 3.500 0 007 0V3M3.500 13.500h9', 'UnderlineIcon');
export const ListIcon = glyph('M6 4.500h7.500M6 8h7.500M6 11.500h7.500M2.500 4.500h.01M2.500 8h.01M2.500 11.500h.01', 'ListIcon');
export const LinkIcon = glyph('M6.500 9.500l3-3M7 4.500l1-1a2.500 2.500 0 013.500 3.500l-1 1M9 11.500l-1 1A2.500 2.500 0 014.500 9l1-1', 'LinkIcon');
export const UndoIcon = glyph('M3 6.500h6.500a3.500 3.500 0 010 7H6M3 6.500l3-3M3 6.500l3 3', 'UndoIcon');
export const RedoIcon = glyph('M13 6.500H6.500a3.500 3.500 0 000 7H10M13 6.500l-3-3M13 6.500l-3 3', 'RedoIcon');
export const MicIcon = glyph('M8 10a2 2 0 002-2V4a2 2 0 00-4 0v4a2 2 0 002 2zM4 8a4 4 0 008 0M8 12v2', 'MicIcon');
export const VolumeIcon = glyph('M2.500 6.500h2.500l3-2.500v8l-3-2.500H2.500zM10.500 6a3 3 0 010 4M12 4.500a5 5 0 010 7', 'VolumeIcon');
export const BellIcon = glyph('M4 11.500V7a4 4 0 018 0v4.500l1 1H3zM6.500 13.500a1.500 1.500 0 003 0', 'BellIcon');
export const CartIcon = glyph('M2 3h2l1.500 7.500h6.500l1.500-5.500H4.500M6 13.500h.01M11.500 13.500h.01', 'CartIcon');
export const SettingsIcon = glyph('M8 10a2 2 0 100-4 2 2 0 000 4zM8 2v2M8 12v2M2 8h2M12 8h2M3.800 3.800l1.400 1.400M10.800 10.800l1.400 1.400M3.800 12.200l1.400-1.400M10.800 5.200l1.400-1.400', 'SettingsIcon');
export const HomeIcon = glyph('M2.500 7.500L8 3l5.500 4.500V13.500h-11zM6.500 13.500v-4h3v4', 'HomeIcon');
export const DownloadIcon = glyph('M8 2.500v8M4.500 7L8 10.500 11.500 7M2.500 10.500v3h11v-3', 'DownloadIcon');
export const FilterIcon = glyph('M2.500 3.500h11l-4.500 5v4.500l-2-1V8.500z', 'FilterIcon');
export const ExpandIcon = glyph('M9.500 2.500h4v4M6.500 13.500h-4v-4M13.500 2.500l-4.500 4.500M2.500 13.500l4.500-4.500', 'ExpandIcon');
export const LockIcon = glyph('M3.500 7.500h9v6h-9zM5.500 7.500V5a2.500 2.500 0 015 0v2.500', 'LockIcon');
export const SendIcon = glyph('M2.500 8l11-5-4 11-2-4.500z', 'SendIcon');
export const MailIcon = glyph('M2.500 3.500h11v9h-11zM2.500 4.500l5.500 4 5.500-4', 'MailIcon');
export const LayersIcon = glyph('M8 2.500l5.500 3L8 8.500l-5.500-3zM2.500 8.500L8 11.500l5.500-3M2.500 11L8 14l5.500-3', 'LayersIcon');
