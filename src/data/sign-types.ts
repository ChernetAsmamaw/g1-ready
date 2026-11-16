import type { CategoryId, SignGroup } from './types';

export interface SignText {
  /** One-line meaning, used as the answer in "What does this sign mean?" */
  short: string;
  /** Fuller explanation for the sign card. */
  meaning: string;
  /** What the driver must do. */
  action: string;
  /** Short action, used as the answer in "What should you do?" */
  doShort: string;
  /** Where drivers usually see it. */
  where: string;
  /** A common mistake drivers make with it. */
  mistake: string;
}

export interface SignDef extends SignText {
  id: string;
  name: string;
  group: SignGroup;
  /** Signs that are often confused with this one. */
  related: string[];
  /** Quiz category its auto-generated questions belong to. */
  quiz: CategoryId;
  /** Accessible text alternative for the drawing. */
  alt: string;
  draw: () => JSX.Element;
}

export function sign(
  id: string,
  name: string,
  group: SignGroup,
  alt: string,
  draw: () => JSX.Element,
  text: SignText,
  related: string[] = [],
  quiz: CategoryId = 'signs',
): SignDef {
  return { id, name, group, alt, draw, related, quiz, ...text };
}
