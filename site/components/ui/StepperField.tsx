"use client";

type Props = { label: string; value: string; onChange: (v: string) => void; min?: number; max?: number; placeholder?: string; disabled?: boolean };

/** A number box with an iOS-style − | + stepper. Typing works too; only digits are kept. */
export function StepperField({ label, value, onChange, min = 0, max = 9999, placeholder, disabled }: Props) {
  const n = value === "" ? null : Number(value);
  const step = (by: number) => onChange(String(Math.min(max, Math.max(min, (n ?? min) + by))));
  return (
    <label className="ui-field">
      <span className="ui-label">{label}</span>
      <span className="ui-control ui-stepper">
        <input
          inputMode="numeric"
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value.replace(/\D/g, "").slice(0, String(max).length))}
          onKeyDown={(e) => {
            if (e.key === "ArrowUp" || e.key === "ArrowDown") {
              e.preventDefault();
              step(e.key === "ArrowUp" ? 1 : -1);
            }
          }}
        />
        <span className="ui-stepper-btns">
          <button type="button" aria-label={`Less ${label.toLowerCase()}`} disabled={disabled || n === null || n <= min} onClick={() => step(-1)}>−</button>
          <button type="button" aria-label={`More ${label.toLowerCase()}`} disabled={disabled || (n !== null && n >= max)} onClick={() => step(1)}>+</button>
        </span>
      </span>
    </label>
  );
}
