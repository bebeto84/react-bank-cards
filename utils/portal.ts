import { createPortal } from 'react-dom';

const getPortalRoot = (): HTMLElement =>
  document.getElementById('portal');

const createContainerDiv = (id: string): HTMLElement => {
  const div = document.createElement('div');
  div.setAttribute('id', id);
  getPortalRoot().appendChild(div);

  return div;
};

export const createModal = (id: string, children: any) =>
  typeof navigator !== 'undefined'
    ? createPortal(children, createContainerDiv(id))
    : null;

export const removeModal = (id: string): void => {
  const div = document.getElementById(id);
  getPortalRoot().removeChild(div);
};
