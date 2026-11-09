import { useEffect } from 'react';

// Simple dialog: closes with the X button, the Escape key or a click on the dark backdrop.
export default function Modal({ title, subtitle, onClose, children }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div className="modal" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="frame-wrap modal__wrap" role="dialog" aria-modal="true" aria-label={title}>
        <div className="frame modal__panel">
          <header className="modal__head">
            <div>
              {subtitle && <p className="modal__sub">{subtitle}</p>}
              <h2>{title}</h2>
            </div>
            <button type="button" className="modal__close" onClick={onClose} aria-label="Close">
              ✕
            </button>
          </header>
          <div className="modal__body">{children}</div>
        </div>
      </div>
    </div>
  );
}
