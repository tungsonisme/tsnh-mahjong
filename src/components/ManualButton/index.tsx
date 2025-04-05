import styles from "./styles.module.scss";

function ManualButton() {
  const link =
    "https://drive.google.com/file/d/1mbd2wei6JtjO05lpRoSVkG1Cggs6m9CM/view?usp=sharing";

  return (
    <div className={styles.manualButton}>
      <a href={link} target="_blank" rel="noreferrer">
        Luật Chơi
      </a>
    </div>
  );
}

export default ManualButton;
