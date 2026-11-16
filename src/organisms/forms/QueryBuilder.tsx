import type { ReactElement } from 'react';
import { Button, IconButton, Input, NativeSelect } from '../../atoms';
import { PlusIcon, XIcon } from '../../tokens/icons';
import { cx } from '../../utils/cx';
import { useControlled } from '../../utils/useControlled';
import './QueryBuilder.css';

export type QueryCombinator = 'and' | 'or';
export interface QueryRule { field: string; operator: string; value: string }
export interface QueryGroup { combinator: QueryCombinator; rules: Array<QueryRule | QueryGroup> }
export interface QueryField { name: string; label: string; type?: 'text' | 'number' }

export interface QueryBuilderProps {
  /** The fields a rule can test. */
  fields: QueryField[];
  /** The query tree: a group of rules and nested groups. */
  value?: QueryGroup;
  defaultValue?: QueryGroup;
  onChange?: (query: QueryGroup) => void;
  /** Accessible name of the builder. */
  'aria-label'?: string;
  className?: string;
}

const OPERATORS: Record<'text' | 'number', Array<[string, string]>> = {
  text: [['eq', 'is'], ['neq', 'is not'], ['contains', 'contains'], ['starts', 'starts with']],
  number: [['eq', '='], ['neq', '≠'], ['gt', '>'], ['gte', '≥'], ['lt', '<'], ['lte', '≤']],
};

const isGroup = (node: QueryRule | QueryGroup): node is QueryGroup => 'rules' in node;

/** Immutable update of the group at `path` (a list of indexes into nested `rules`). */
function updateGroup(root: QueryGroup, path: number[], change: (group: QueryGroup) => QueryGroup): QueryGroup {
  if (path.length === 0) return change(root);
  const [head, ...rest] = path;
  return { ...root, rules: root.rules.map((node, index) => (index === head && isGroup(node) ? updateGroup(node, rest, change) : node)) };
}

/** Builds a filter as a nested tree of `and`/`or` groups and field rules, with add and remove for both. */
export function QueryBuilder({ fields, value, defaultValue = { combinator: 'and', rules: [] }, onChange, 'aria-label': ariaLabel = 'Query builder', className }: QueryBuilderProps) {
  const [query, setQuery] = useControlled(value, defaultValue, onChange);
  const fieldOf = (name: string) => fields.find((field) => field.name === name) ?? fields[0];
  const newRule = (): QueryRule => ({ field: fields[0]?.name ?? '', operator: 'eq', value: '' });

  const edit = (path: number[], change: (group: QueryGroup) => QueryGroup) => setQuery(updateGroup(query, path, change));

  const renderRule = (rule: QueryRule, path: number[], index: number) => {
    const type = fieldOf(rule.field)?.type ?? 'text';
    const patch = (next: Partial<QueryRule>) => edit(path, (group) => ({ ...group, rules: group.rules.map((node, i) => (i === index ? { ...(node as QueryRule), ...next } : node)) }));
    const n = index + 1;
    return (
      <li key={index} className="gl-query-builder__rule">
        <NativeSelect aria-label={`Rule ${n} field`} variant="cell" value={rule.field} onChange={(event) => patch({ field: event.target.value, operator: 'eq' })}>
          {fields.map((field) => <option key={field.name} value={field.name}>{field.label}</option>)}
        </NativeSelect>
        <NativeSelect aria-label={`Rule ${n} operator`} variant="cell" value={rule.operator} onChange={(event) => patch({ operator: event.target.value })}>
          {OPERATORS[type].map(([id, label]) => <option key={id} value={id}>{label}</option>)}
        </NativeSelect>
        <Input variant="cell" className="gl-query-builder__value" aria-label={`Rule ${n} value`} type={type === 'number' ? 'number' : 'text'} value={rule.value} onChange={(event) => patch({ value: event.target.value })} />
        <IconButton className="gl-query-builder__remove" variant="ghost" label={`Remove rule ${n}`} icon={<XIcon />} onClick={() => edit(path, (group) => ({ ...group, rules: group.rules.filter((_, i) => i !== index) }))} />
      </li>
    );
  };

  const renderGroup = (group: QueryGroup, path: number[], remove?: () => void): ReactElement => (
    <div className={cx('gl-query-builder__group', path.length > 0 && 'gl-query-builder__group--nested')} role="group" aria-label={path.length === 0 ? 'Match' : `Group ${path.map((p) => p + 1).join('.')}`}>
      <div className="gl-query-builder__head">
        <div className="gl-query-builder__combinator" role="group" aria-label="Combinator">
          {(['and', 'or'] as const).map((combinator) => (
            <button key={combinator} type="button" aria-pressed={group.combinator === combinator} onClick={() => edit(path, (g) => ({ ...g, combinator }))}>{combinator}</button>
          ))}
        </div>
        <span className="gl-query-builder__spacer" />
        <Button size="sm" variant="ghost" icon={<PlusIcon />} onClick={() => edit(path, (g) => ({ ...g, rules: [...g.rules, newRule()] }))}>Rule</Button>
        <Button size="sm" variant="ghost" icon={<PlusIcon />} onClick={() => edit(path, (g) => ({ ...g, rules: [...g.rules, { combinator: 'and', rules: [newRule()] }] }))}>Group</Button>
        {remove && <IconButton size="sm" variant="ghost" label="Remove group" icon={<XIcon />} onClick={remove} />}
      </div>
      {group.rules.length === 0 ? <p className="gl-query-builder__empty">No conditions. Everything matches.</p> : (
        <ul className="gl-query-builder__rules">
          {group.rules.map((node, index) => isGroup(node)
            ? <li key={index} className="gl-query-builder__item">{renderGroup(node, [...path, index], () => edit(path, (g) => ({ ...g, rules: g.rules.filter((_, i) => i !== index) })))}</li>
            : renderRule(node, path, index))}
        </ul>
      )}
    </div>
  );

  return <div className={cx('gl-query-builder', className)} role="region" aria-label={ariaLabel}>{renderGroup(query, [])}</div>;
}
