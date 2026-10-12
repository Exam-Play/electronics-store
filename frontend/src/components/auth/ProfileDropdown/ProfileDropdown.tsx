import { type RefObject, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ClipboardList, User, LogOut } from "lucide-react";

import styles from './ProfileDropdown.module.scss'

import { authStore } from '../../../stores/AuthStore.ts';

interface ProfileDropdownProps {
    onClose: () => void;
    onLogout: () => void;
    excludeRef: RefObject<HTMLElement | null>;
}

export function ProfileDropdown({ onClose, onLogout, excludeRef }: ProfileDropdownProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            const target = e.target as Node;
            if (
                ref.current && !ref.current.contains(target) &&
                excludeRef.current && !excludeRef.current.contains(target)
            ) {
                onClose();
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose, excludeRef]);

    return (
        <div className={styles.profileDropdown} ref={ref}>
            <div className={styles.profileDropdown__header}>
                <div className={styles.profileDropdown__avatar}>
                    <User size={24} />
                </div>
                <div>
                    <p className={styles.profileDropdown__name}>{authStore.username}</p>
                </div>
            </div>

            <nav className={styles.profileDropdown__menu}>
                <Link to="/cart?tab=history" onClick={onClose}>
                    <ClipboardList size={18} strokeWidth={2.5} />
                    <span>Мои заказы</span>
                </Link>
            </nav>

            <button className={styles.profileDropdown__logout} onClick={onLogout}>
                <LogOut size={18} />
                <span>Выйти</span>
            </button>
        </div>
    );
}