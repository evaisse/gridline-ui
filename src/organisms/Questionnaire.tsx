import { useState, type ReactNode } from 'react';
import { Button, Checkbox, Heading, Label, Radio, RadioGroup, Text, Textarea } from '../atoms';
import { cx } from '../utils/cx';
import './Questionnaire.css';

export interface Question {
  id: string;
  title: string;
  description?: string;
  type: 'single' | 'multiple' | 'text';
  options?: Array<{ value: string; label: string; description?: string }>;
  /** Allow moving on without an answer. */
  skippable?: boolean;
}

export type Answers = Record<string, string | string[]>;

export interface QuestionnaireProps {
  questions: Question[];
  onSubmit?: (answers: Answers) => void;
  submitLabel?: string;
  /** Shown once every question is answered. */
  done?: ReactNode;
  className?: string;
}

/** Asks one question at a time: single choice, multiple choice, or free text. */
export function Questionnaire({ questions, onSubmit, submitLabel = 'Submit', done, className }: QuestionnaireProps) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [finished, setFinished] = useState(false);

  const question = questions[index];
  if (!question) return null;
  const answer = answers[question.id];
  const answered = Array.isArray(answer) ? answer.length > 0 : Boolean(answer?.trim());
  const last = index === questions.length - 1;
  const set = (value: string | string[]) => setAnswers((current) => ({ ...current, [question.id]: value }));

  const next = () => {
    if (!last) return setIndex(index + 1);
    setFinished(true);
    onSubmit?.(answers);
  };

  if (finished) {
    return <div className={cx('gl-questionnaire', className)}><div className="gl-questionnaire__body">{done ?? <Text>Thanks. Your answers were recorded.</Text>}</div></div>;
  }

  return (
    <form className={cx('gl-questionnaire', className)} onSubmit={(event) => { event.preventDefault(); next(); }}>
      <div className="gl-questionnaire__head">
        <Label>Question {index + 1} of {questions.length}</Label>
        <div className="gl-questionnaire__steps" aria-hidden="true">
          {questions.map((q, i) => <span key={q.id} data-state={i < index ? 'done' : i === index ? 'current' : 'todo'} />)}
        </div>
      </div>
      <fieldset className="gl-questionnaire__body">
        <legend>
          <Heading level={3} size="md">{question.title}</Heading>
          {question.description && <Text variant="small" tone="muted">{question.description}</Text>}
        </legend>
        {question.type === 'single' && (
          <RadioGroup value={typeof answer === 'string' ? answer : ''} onValueChange={set} className="gl-questionnaire__options">
            {question.options?.map((option) => (
              <label key={option.value} className="gl-questionnaire__option">
                <Radio value={option.value} />
                <span><span>{option.label}</span>{option.description && <small>{option.description}</small>}</span>
              </label>
            ))}
          </RadioGroup>
        )}
        {question.type === 'multiple' && (
          <div className="gl-questionnaire__options">
            {question.options?.map((option) => {
              const list = Array.isArray(answer) ? answer : [];
              return (
                <label key={option.value} className="gl-questionnaire__option">
                  <Checkbox checked={list.includes(option.value)} onCheckedChange={(on) => set(on === true ? [...list, option.value] : list.filter((v) => v !== option.value))} />
                  <span><span>{option.label}</span>{option.description && <small>{option.description}</small>}</span>
                </label>
              );
            })}
          </div>
        )}
        {question.type === 'text' && <Textarea aria-label={question.title} value={typeof answer === 'string' ? answer : ''} onChange={(event) => set(event.target.value)} placeholder="Type your answer" />}
      </fieldset>
      <div className="gl-questionnaire__foot">
        <Button type="button" disabled={index === 0} onClick={() => setIndex(index - 1)}>Back</Button>
        <span className="gl-questionnaire__spacer" />
        {question.skippable && !answered && <Button type="button" variant="ghost" onClick={next}>Skip</Button>}
        <Button type="submit" variant="solid" disabled={!answered}>{last ? submitLabel : 'Next'}</Button>
      </div>
    </form>
  );
}
