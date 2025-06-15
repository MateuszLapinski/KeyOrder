import React, { useState } from 'react';
import '../CSS/RegisterPage.css';
import { useNavigate } from 'react-router-dom';
export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [consent, setConsent] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !phone) {
            alert('Uzupełnij wszystkie wymagane pola.');
            return;
        }
        console.log({ email, phone, consent });
        navigate('/register2', { state: { email, phone, consent } });
    };

    return (
        <div className="register-wrapper">
            <div className="register-card">
                <p className="register-step">KROK 1/2</p>
                <h1 className="register-header">
                    Testuj sklep internetowy KeyOrder przez 14 dni za darmo
                </h1>

                <div className="register-notice">
                    <span role="img" aria-label="lock">
                        🔒
                    </span>{' '}
                    Twoje dane są u nas bezpieczne. Potrzebujemy ich, aby wysłać ci dane logowania do panelu.
                </div>

                <form onSubmit={handleSubmit} className="register-form">
                    <input
                        type="email"
                        placeholder="Adres e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="register-input"
                        required
                    />

                    <div className="register-phone-group">
                        <span className="register-country-code">+48</span>
                        <input
                            type="tel"
                            placeholder="Numer telefonu"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="register-phone-input"
                            required
                        />
                    </div>

                    <label className="register-checkbox-label">
                        <input
                            type="checkbox"
                            checked={consent}
                            onChange={(e) => setConsent(e.target.checked)}
                        />
                        <span className="register-checkbox-text">
                            Wyrażam zgodę na otrzymywanie od KeyOrder informacji handlowych drogą elektroniczną i telefoniczną.
                        </span>
                    </label>

                    <button href="/register2" type="submit" className="register-button">
                        Przejdź dalej
                    </button>

                    <p className="register-footer-text">
                        Podając dane kontaktowe, akceptujesz{' '}
                        <a href="#">Regulamin</a> i <a href="#">Politykę Prywatności</a>.
                    </p>
                </form>
            </div>
        </div>
    );
}