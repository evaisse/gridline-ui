import { Checkbox, Input, NativeSelect } from '../../atoms';
import { cx } from '../../utils/cx';
import { useControlled } from '../../utils/useControlled';
import './PropertyGrid.css';

export type PropertyValue = string | number | boolean;
export type PropertyValues = Record<string, PropertyValue>;

export interface PropertyDef {
  key: string;
  label: string;
  /** How the value is edited. Defaults to `text`. */
  type?: 'text' | 'number' | 'boolean' | 'select' | 'readonly';
  /** Choices for `select`. */
  options?: string[];
  /** Section the property sits under. */
  group?: string;
  /** Unit or hint shown beside the label. */
  hint?: string;
}

export interface PropertyGridProps {
  properties: PropertyDef[];
  /** The object being edited, keyed by `PropertyDef.key`. */
  value?: PropertyValues;
  defaultValue?: PropertyValues;
  onChange?: (values: PropertyValues) => void;
  /** Accessible name of the table. */
  'aria-label'?: string;
  className?: string;
}

/** Edits the properties of one object as a two-column table: names on the left, typed editors on the right, with optional sections. */
export function PropertyGrid({ properties, value, defaultValue = {}, onChange, 'aria-label': ariaLabel = 'Properties', className }: PropertyGridProps) {
  const [values, setValues] = useControlled(value, defaultValue, onChange);
  const set = (key: string, next: PropertyValue) => setValues({ ...values, [key]: next });

  const editor = (property: PropertyDef) => {
    const current = values[property.key];
    const name = property.label;
    switch (property.type ?? 'text') {
      case 'boolean':
        return <span className="gl-property-grid__check"><Checkbox aria-label={name} checked={current === true} onCheckedChange={(checked) => set(property.key, checked === true)} /></span>;
      case 'select':
        return (
          <NativeSelect variant="cell" aria-label={name} value={String(current ?? '')} onChange={(event) => set(property.key, event.target.value)}>
            {(property.options ?? []).map((option) => <option key={option} value={option}>{option}</option>)}
          </NativeSelect>
        );
      case 'number':
        return <Input variant="cell" type="number" aria-label={name} value={current === undefined ? '' : String(current)} onChange={(event) => set(property.key, event.target.value === '' ? '' : Number(event.target.value))} />;
      case 'readonly':
        return <span className="gl-property-grid__readonly">{String(current ?? '')}</span>;
      default:
        return <Input variant="cell" aria-label={name} value={String(current ?? '')} onChange={(event) => set(property.key, event.target.value)} />;
    }
  };

  const groups: Array<{ title?: string; items: PropertyDef[] }> = [];
  for (const property of properties) {
    const last = groups[groups.length - 1];
    if (last && last.title === property.group) last.items.push(property);
    else groups.push({ title: property.group, items: [property] });
  }

  return (
    <table className={cx('gl-property-grid', className)} aria-label={ariaLabel}>
      {groups.map((group, index) => (
        <tbody key={index}>
          {group.title && <tr><th colSpan={2} scope="colgroup" className="gl-property-grid__group">{group.title}</th></tr>}
          {group.items.map((property) => (
            <tr key={property.key}>
              <th scope="row" className="gl-property-grid__name">
                {property.label}
                {property.hint && <span className="gl-property-grid__hint">{property.hint}</span>}
              </th>
              <td className="gl-property-grid__value">{editor(property)}</td>
            </tr>
          ))}
        </tbody>
      ))}
    </table>
  );
}
