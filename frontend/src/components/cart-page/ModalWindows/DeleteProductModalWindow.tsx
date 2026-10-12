import closeCross from '../../../assets/images/icons/cross.svg'

import styles from './ModalWindows.module.scss'

import type { ProductCart } from '../../../utils/structures.ts';

interface DeleteProductModalWindowProps {
    item: ProductCart,
    onConfirm: () => void,
    onCancel: () => void
}

export function DeleteProductModalWindow({ item, onConfirm, onCancel }: DeleteProductModalWindowProps) {
    return <div className={styles.deleteProductWindow}>
        <div className={styles.deleteWrapper}>
            <button className={styles.closeButton} onClick={onCancel}>
                <img src={closeCross} alt="close cross"/>
            </button>

            <div className={styles.content}>
                <h3>Вы действительно хотите удалить {item.name.charAt(0).toLowerCase() + item.name.slice(1)}?</h3>

                <div className={styles.buttons}>
                    <button className={styles.deleteButton} onClick={onCancel}>
                        <p>Отмена</p>
                    </button>
                    <button className={`button-blue-template ${styles.buttonBlueTemplate}`} onClick={onConfirm}>
                        <span>Да, удалить</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
}