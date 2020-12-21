import styles from './box.module.css'

export default function Box({ onClick, children }) {
  return (
    <div class={styles.box} onClick={onClick}>
      {children}
    </div>
  );
}
