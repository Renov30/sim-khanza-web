import type { KeyboardEvent } from "react";

const SELECTOR_FIELD =
  'input:not([type="hidden"]), select, textarea, [data-enter-field="true"]';

const TIPE_INPUT_NON_FIELD = new Set([
  "button",
  "checkbox",
  "color",
  "file",
  "image",
  "radio",
  "range",
  "reset",
  "submit",
]);

function adalahFieldAktif(element: HTMLElement) {
  if (element.getClientRects().length === 0) return false;

  if (element.dataset.enterField === "true") {
    return !element.matches(":disabled") && element.tabIndex >= 0;
  }

  if (
    !(element instanceof HTMLInputElement) &&
    !(element instanceof HTMLSelectElement) &&
    !(element instanceof HTMLTextAreaElement)
  ) {
    return false;
  }

  if (element.disabled || element.tabIndex < 0) return false;
  if (
    (element instanceof HTMLInputElement ||
      element instanceof HTMLTextAreaElement) &&
    element.readOnly
  ) {
    return false;
  }
  if (
    element instanceof HTMLInputElement &&
    TIPE_INPUT_NON_FIELD.has(element.type)
  ) {
    return false;
  }

  return true;
}

/**
 * Menjadikan Enter seperti Tab pada field formulir.
 * Textarea mempertahankan Enter untuk baris baru dan memakai Ctrl+Enter untuk maju.
 */
export function pindahFieldDenganEnter(event: KeyboardEvent<HTMLElement>) {
  if (event.key !== "Enter" || event.nativeEvent.isComposing) return;

  const target = event.target;
  if (
    !(target instanceof HTMLInputElement) &&
    !(target instanceof HTMLSelectElement) &&
    !(target instanceof HTMLTextAreaElement)
  ) {
    return;
  }

  const textarea = target instanceof HTMLTextAreaElement;
  if (textarea) {
    if (!event.ctrlKey || event.altKey || event.metaKey || event.shiftKey) return;
    // Ctrl+Enter tidak boleh menambah baris baru meski ini field terakhir.
    event.preventDefault();
  } else {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (
      target instanceof HTMLInputElement &&
      TIPE_INPUT_NON_FIELD.has(target.type)
    ) {
      return;
    }
  }

  const fields = Array.from(
    event.currentTarget.querySelectorAll<HTMLElement>(SELECTOR_FIELD),
  ).filter(adalahFieldAktif);
  const index = fields.indexOf(target);
  const berikutnya = index >= 0 ? fields[index + 1] : undefined;

  if (!berikutnya) return;
  event.preventDefault();
  berikutnya.focus();
}
