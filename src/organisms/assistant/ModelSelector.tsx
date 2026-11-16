import type { ReactNode } from 'react';
import { Label } from '../../atoms';
import { ToggleGroup, ToggleGroupItem } from '../../molecules';
import { cx } from '../../utils/cx';
import { useControlled } from '../../utils/useControlled';
import './ModelSelector.css';

export interface ModelOption {
  id: string;
  name: string;
  description?: ReactNode;
  /** Context window, e.g. `200K`. */
  context?: string;
  /** Price per million tokens, e.g. `$3 / $15`. */
  price?: string;
  /** Whether reasoning effort applies to this model. Defaults to true. */
  reasoning?: boolean;
  disabled?: boolean;
}

export type ReasoningEffort = 'low' | 'medium' | 'high';

export interface ModelSelection { model: string; effort: ReasoningEffort }

export interface ModelSelectorProps {
  models: ModelOption[];
  value?: ModelSelection;
  defaultValue?: ModelSelection;
  onChange?: (value: ModelSelection) => void;
  className?: string;
}

const efforts: ReasoningEffort[] = ['low', 'medium', 'high'];

/** Chooses the model for the next message, with its context and price, and a reasoning-effort toggle. */
export function ModelSelector({ models, value, defaultValue, onChange, className }: ModelSelectorProps) {
  const [selection, setSelection] = useControlled<ModelSelection>(value, defaultValue ?? { model: models[0]?.id ?? '', effort: 'medium' }, onChange);
  const selected = models.find((model) => model.id === selection.model);
  const showEffort = selected?.reasoning !== false;

  return (
    <div className={cx('gl-model-selector', className)}>
      <div role="radiogroup" aria-label="Model" className="gl-model-selector__list">
        {models.map((model) => {
          const checked = model.id === selection.model;
          const move = (step: number) => {
            const enabled = models.filter((m) => !m.disabled);
            const next = enabled[(enabled.findIndex((m) => m.id === model.id) + step + enabled.length) % enabled.length];
            if (next) setSelection({ ...selection, model: next.id });
          };
          return (
            <button
              key={model.id} type="button" role="radio" aria-checked={checked} disabled={model.disabled} tabIndex={checked ? 0 : -1}
              className="gl-model-selector__option" onClick={() => setSelection({ ...selection, model: model.id })}
              onKeyDown={(event) => {
                if (event.key === 'ArrowDown' || event.key === 'ArrowRight') { event.preventDefault(); move(1); }
                if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
              }}
            >
              <span className="gl-model-selector__name">{model.name}</span>
              {model.description != null && <span className="gl-model-selector__desc">{model.description}</span>}
              {(model.context != null || model.price != null) && (
                <span className="gl-model-selector__figures">
                  {model.context != null && <Label tone="inherit" size="xs">Context {model.context}</Label>}
                  {model.price != null && <Label tone="inherit" size="xs">{model.price}</Label>}
                </span>
              )}
            </button>
          );
        })}
      </div>
      <div className="gl-model-selector__effort">
        <Label>Reasoning effort</Label>
        <ToggleGroup
          type="single" aria-label="Reasoning effort" value={selection.effort} disabled={!showEffort}
          onValueChange={(next: string) => { if (next) setSelection({ ...selection, effort: next as ReasoningEffort }); }}
        >
          {efforts.map((effort) => <ToggleGroupItem key={effort} value={effort}>{effort}</ToggleGroupItem>)}
        </ToggleGroup>
      </div>
    </div>
  );
}
