export type FormObj<T> = { [key in keyof T]: HTMLInputElement } & HTMLFormControlsCollection;

export interface FormElement<T> extends HTMLFormElement {
  readonly elements: FormObj<T>;
}

export type EventForm<T> = React.FormEvent<FormElement<T>>;

export async function OnFormSubmission<T>(
  event: React.FormEvent<HTMLFormElement>,
  callback: (v: FormObj<T>) => unknown,
  { preventDefault, reset }: { preventDefault?: boolean; reset?: boolean } = { preventDefault: true, reset: false }
) {
  if (preventDefault) event.preventDefault();
  const formElements = event.currentTarget.elements;
  const cbResult = await callback(formElements as FormObj<T>);
  // if (reset) event.currentTarget.reset();
  return cbResult;
}
