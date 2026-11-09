import Modal from './Modal.jsx';
import { GENERAL_RULES } from '../data/generalRules.js';

export default function RulesBook({ onClose }) {
  return (
    <Modal title="RULES BOOK" subtitle="GENERAL RULES" onClose={onClose}>
      {GENERAL_RULES.map((sec) => (
        <section key={sec.heading} className="book__sec">
          <h3>{sec.heading}</h3>
          <ul>
            {sec.items.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </section>
      ))}
    </Modal>
  );
}
