export interface ConfirmModalData {
  title: string;
  content: string;
  onOk?: () => void;
  onCancel?: () => void;
}
