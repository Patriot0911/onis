import { validateEmail } from '@/services/utils';
import { useEffect, useState } from 'react';

interface EmailOrNicknameInputProps {
    value: string;
    onChange: (value: string) => void;
    isLogin: boolean;
    hasSubmitted: boolean;
}

const EmailOrNicknameInput = ({ value, onChange, isLogin, hasSubmitted }: EmailOrNicknameInputProps) => {
    const [error, setError] = useState('');

    useEffect(() => {
        if (value.trim() === '') {
            setError(isLogin ? 'Електронна пошта або нікнейм не можуть бути порожніми' : 'Електронна пошта не може бути порожньою');
        } else if (!isLogin && !validateEmail(value)) {
            setError('Введіть дійсну електронну пошту');
        } else {
            setError('');
        }
    }, [value, isLogin]);

    return (
        <>
            <input
                type="text"
                placeholder={`Електронна пошта${isLogin ? ' або нікнейм' : ''}`}
                className="p-5 border-blue-600 border-2 rounded-md"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            {error && hasSubmitted && <p className="text-red-500 mt-2">{error}</p>}
        </>
    );
};

export default EmailOrNicknameInput;
