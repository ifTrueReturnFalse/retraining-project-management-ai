"use client";

import styles from "./BaseModal.module.css";
import { ComponentPropsWithoutRef } from "react";
import classNames from "classnames";
import CloseIcon from "@/components/Icons/CloseIcon";
import { useEffect, useRef } from "react";

interface BaseModalProps extends ComponentPropsWithoutRef<"dialog"> {
  isOpen: boolean;
  onClose: () => void;
  isFullHeight?: boolean;
}

export default function BaseModal({
  isOpen,
  onClose,
  isFullHeight = false,
  ...props
}: BaseModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  return (
    <dialog
      className={classNames(styles.container, props.className, {
        [styles.fullHeight]: isFullHeight,
      })}
      ref={dialogRef}
      onClose={onClose}
    >
      <CloseIcon className={styles.closeIcon} onClick={onClose} />
      {props.children}
    </dialog>
  );
}
