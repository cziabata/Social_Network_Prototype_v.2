import React from "react";
import { WrappedFieldProps } from "redux-form";
import styles from "./FormControls.module.css";

export let Textarea:React.FC<WrappedFieldProps> = ({input, meta, ...props }) => {
    const hasError = meta.touched && meta.error
    return(
        <div className={styles.formControl + " " + ( hasError ? styles.error : "")}>
            <textarea {...input} {...props} />
            <div>{hasError && <span>{meta.error}</span>}</div>
        </div>
    )
}
export let Input:React.FC<WrappedFieldProps> = ({input, meta, ...props }) => {
    const hasError = meta.touched && meta.error
    return(
        <div className={styles.formControl + " " + ( hasError ? styles.error : "")}>
            <input {...input} {...props} />
            <div>{hasError && <span>{meta.error}</span>}</div>
        </div>
    )
}