export default interface DialogBasicProps {
  title?: string;
  description?: string;
  confirmText?: string;
  destructive?: boolean;
  cancelText?: string;
  open?: boolean;
  onCancel?: () => void;
}
