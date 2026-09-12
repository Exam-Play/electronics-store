import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ClipboardList, User, LogOut } from 'lucide-react';
import { authStore } from '../stores/AuthStore';

type ProfileDropdownProps = {
    onClose: () => void;
    onLogout: () => void;
    excludeRef: React.RefObject<HTMLElement | null>;
};

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
        <div className="profile-dropdown" ref={ref}>
            <div className="profile-dropdown__header">
                <div className="profile-dropdown__avatar">
                    <User size={24} />
                </div>
                <div>
                    <p className="profile-dropdown__name">{authStore.username}</p>
                </div>
            </div>

            <nav className="profile-dropdown__menu">
                <Link to="/cart?tab=history" onClick={onClose}>
                    <ClipboardList size={18} strokeWidth={2.5} />
                    <span>Мои заказы</span>
                </Link>
            </nav>

            <button className="profile-dropdown__logout" onClick={onLogout}>
                <LogOut size={18} />
                <span>Выйти</span>
            </button>
        </div>
    );
}