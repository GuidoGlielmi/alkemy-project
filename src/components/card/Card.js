import Button from 'components/button/Button';
import { useState, useMemo } from 'react';
import styles from './Card.module.css';

export default function Card({ title, datetime, creator, description, type, priority }) {
  const desc = useMemo(() => 'WWWW '.repeat(~~(Math.random() * 50 + 10)), []);
  // rgb(134, 246, 239)
  // rgb(223, 86, 139)
  /* background: `linear-gradient(rgb(59, 59, 59), rgb(29, 29, 29)) padding-box, linear-gradient(to right, #${Math.floor(
          Math.random() * 16777215,
        ).toString(16)}, #928dab) border-box`,  */
  const [isLongDescriptionShown, setIsLongDescriptionShown] = useState(false);
  return (
    <div
      style={{
        background: `linear-gradient(rgb(59, 59, 59), rgb(29, 29, 29)) padding-box, linear-gradient(to right, rgb(223, 86, 139), #928dab) border-box`,
      }}
      className={styles.card}
    >
      <h3>Tarea 1</h3>
      <time dateTime='20:00'>20:00</time>
      <h5>Guido Glielmi</h5>
      <div>
        <Button size='small'>Nueva</Button>
        <Button size='small'>Alta</Button>
      </div>
      <p
        onClick={() => desc.length > 100 && setIsLongDescriptionShown((ps) => !ps)}
        style={{ cursor: desc.length > 100 ? 'pointer' : 'default' }}
      >
        {desc.length < 100 || isLongDescriptionShown ? desc : desc.slice(0, 99) + '...'}
      </p>
      <div>X</div>
    </div>
  );
}
