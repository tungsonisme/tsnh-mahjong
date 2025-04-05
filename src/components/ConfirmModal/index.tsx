import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import appStore from "../../stores/app";

function ConfirmModal() {
  const { confirmModalData } = appStore;

  if (!confirmModalData) {
    return null;
  }

  return (
    <>
      <div
        className={styles.modalOverlay}
        onClick={() => {
          confirmModalData.onCancel?.();
        }}
      />

      <div className={styles.confirmModal}>
        <div className={styles.confirmModalTitle}>{confirmModalData.title}</div>
        <div className={styles.confirmModalContent}>
          <div dangerouslySetInnerHTML={{ __html: confirmModalData.content }} />
        </div>
        <div className={styles.confirmModalButtons}>
          <button
            style={{ color: "red" }}
            className={styles.confirmModalButton}
            onClick={() => {
              confirmModalData.onCancel?.();
            }}
          >
            ĐÉO
          </button>

          <button
            className={styles.confirmModalButton}
            onClick={() => {
              confirmModalData.onOk?.();
            }}
          >
            OK LUÔN
          </button>
        </div>
      </div>
    </>
  );
}

export default observer(ConfirmModal);
