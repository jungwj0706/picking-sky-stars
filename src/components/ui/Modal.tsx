import { useEffect, useRef } from 'react'
import type { MouseEvent, PropsWithChildren } from 'react'

interface ModalProps extends PropsWithChildren {
  labelledBy: string
  onClose: () => void
}

export function Modal({ children, labelledBy, onClose }: ModalProps) {
  const dialog = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const element = dialog.current
    element?.showModal()
    return () => element?.close()
  }, [])

  function handleClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target !== event.currentTarget) return
    const bounds = event.currentTarget.getBoundingClientRect()
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
      event.clientY < bounds.top || event.clientY > bounds.bottom) onClose()
  }

  return (
    <dialog
      ref={dialog}
      className="modal"
      aria-labelledby={labelledBy}
      onClick={handleClick}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
    >
      {children}
    </dialog>
  )
}
