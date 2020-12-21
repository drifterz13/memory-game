export function Box({ onClick, children }) {
  return (
    <div class="box" onClick={onClick}>
      {children}
    </div>
  );
}
