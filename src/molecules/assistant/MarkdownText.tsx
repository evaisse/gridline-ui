import { MarkdownTextPrimitive } from '@assistant-ui/react-markdown';
import remarkGfm from 'remark-gfm';
import { Prose } from '../../atoms';

/** Renders the current assistant-ui text part as Markdown, in Gridline prose. */
export function MarkdownText() {
  return <MarkdownTextPrimitive remarkPlugins={[remarkGfm]} containerComponent={Prose} />;
}
