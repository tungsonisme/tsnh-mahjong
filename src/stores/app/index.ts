import { makeAutoObservable } from "mobx";
import { ConfirmModalData } from "./types";

class AppStore {
  confirmModalData: ConfirmModalData | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  confirm({ title, content, onOk, onCancel }: ConfirmModalData) {
    this.confirmModalData = {
      title,
      content,
      onOk: () => {
        onOk?.();
        this.confirmModalData = null;
      },
      onCancel: () => {
        onCancel?.();
        this.confirmModalData = null;
      },
    };
  }
}

const appStore = new AppStore();

export default appStore;
