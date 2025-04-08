import css from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={css.loadingContainer}>
      <div className={css.loader}></div>
    </div>
  );
}
