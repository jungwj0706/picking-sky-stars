import { Info, X } from 'lucide-react'

export function Toast({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  return (
    <div className="toast">
      <p role="status"><Info size={17} aria-hidden="true" />{message}</p>
      <button className="icon-button icon-button--plain" type="button" aria-label="위치 안내 닫기" onClick={onDismiss}>
        <X size={16} aria-hidden="true" />
      </button>
    </div>
  )
}
