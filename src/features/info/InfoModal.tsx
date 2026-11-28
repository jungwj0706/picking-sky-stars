import { Star, X } from 'lucide-react'
import { GradeBadge } from '../../components/ui/GradeBadge'
import { Modal } from '../../components/ui/Modal'
import { grades } from '../forecast/grade'
import { Legend } from '../map/components/Legend'

interface InfoModalProps {
  onClose: () => void
  onRefresh: () => void
}

export function InfoModal({ onClose, onRefresh }: InfoModalProps) {
  return (
    <Modal labelledBy="info-title" onClose={onClose}>
      <div className="info-modal">
        <Star size={23} className="info-modal__star" aria-hidden="true" />
        <button className="icon-button icon-button--plain info-modal__close" type="button" aria-label="안내 닫기" onClick={onClose} autoFocus>
          <X size={19} aria-hidden="true" />
        </button>
        <h2 id="info-title">점수 읽는 법</h2>
        <p className="info-modal__accent">밝을수록 별이 잘 보여요</p>
        <p className="info-modal__description">오늘 밤 하늘 상태와 장소 조건을 함께 계산해 별이 얼마나 잘 보일지 보여줘요.</p>
        <Legend />
        <ul className="info-modal__grades">
          {(['high', 'medium', 'low'] as const).map((grade) => (
            <li key={grade}><GradeBadge grade={grade} /><span>{grades[grade].range}</span></li>
          ))}
        </ul>
        <p className="info-modal__note">점수는 0~100점으로 표시해요.</p>
        <p className="info-modal__note">예보 범위는 한국 시간 기준 오늘 22시부터 다음 날 02시까지예요.</p>
        <button className="info-modal__refresh" type="button" onClick={onRefresh}>예보 새로고침</button>
      </div>
    </Modal>
  )
}
