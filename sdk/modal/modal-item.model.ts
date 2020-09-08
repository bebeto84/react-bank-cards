export interface Modal {
  isOpened: boolean;
  id: string;
  onClose: () => void;
  title: string;
}
