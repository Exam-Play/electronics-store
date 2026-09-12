import { useState } from "react";
import type { ReactNode } from "react";

export type AuthField = {
    name: string;
    label: string;
    type: 'text' | 'password';
    minLength?: number;
};

type ServerErrorType = 'incorrect-data' | 'conflict';
type ClientErrorType = 'empty-data' | 'size' | 'mismatch';
type AuthErrorType = ClientErrorType | ServerErrorType;

type AuthFormProps = {
    fields: AuthField[];
    submitLabel: string;
    onSubmit: (values: Record<string, string>) => Promise<ServerErrorType | null>;
    footer?: ReactNode;
};

const STATIC_MESSAGES: Record<Exclude<AuthErrorType, 'size'>, string> = {
    'empty-data': 'Нельзя вводить пустые поля',
    'mismatch': 'Пароли не совпадают',
    'incorrect-data': 'Неправильный логин или пароль',
    'conflict': 'Такой логин уже занят',
};

export function AuthForm({ fields, submitLabel, onSubmit, footer }: AuthFormProps) {
    const [errorMessage, setErrorMessage] = useState('');

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const values: Record<string, string> = {};

        for (const field of fields) {
            values[field.name] = formData.get(field.name)?.toString() || '';
        }

        if (Object.values(values).some(v => v === '')) {
            setErrorMessage(STATIC_MESSAGES['empty-data']);
            return;
        }

        for (const field of fields) {
            if (field.minLength && values[field.name].length < field.minLength) {
                setErrorMessage(`Длина поля «${field.label}» не может быть меньше ${field.minLength} символов`);
                return;
            }
        }

        if ('confirmPassword' in values && values.password !== values.confirmPassword) {
            setErrorMessage(STATIC_MESSAGES['mismatch']);
            return;
        }

        onSubmit(values).then((result) => {
            setErrorMessage(result ? STATIC_MESSAGES[result] : '');
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            {fields.map(field => (
                <div className="input-template" key={field.name}>
                    <label htmlFor={field.name}>{field.label}</label>
                    <input
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        style={errorMessage !== '' ? { outline: '1px #FF60C3 solid' } : {}}
                    />
                </div>
            ))}

            {errorMessage !== '' && <p>{errorMessage}</p>}

            <div className='auth-buttons'>
                <button type='submit'>{submitLabel}</button>
                {footer}
            </div>
        </form>
    );
}