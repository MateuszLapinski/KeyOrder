import React, { useState, useEffect } from 'react';
import '../CSS/RegisterPage.css';

export default function RegisterPage2() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState('');
    const [organizations, setOrganizations] = useState([]);
    const [selectedOrg, setSelectedOrg] = useState('');

    useEffect(() => {
        fetch('http://localhost:5029/api/roles')
            .then(res => res.json())
            .then(setRoles);

        fetch('http://localhost:5029/api/organizations')
            .then(res => res.json())
            .then(setOrganizations);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!firstName || !lastName || !userName || !password || !confirm) {
            alert('Uzupe³nij wszystkie pola.');
            return;
        }
        if (password !== confirm) {
            alert('Has³a nie s¹ zgodne.');
            return;
        }

        const user = {
            firstName,
            lastName,
            userName,
            
            passwordHash: password,
            roleID: selectedRole,
            organizationID: selectedOrg,
        };

        fetch('http://localhost:5029/api/Users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        }).then(res => {
            if (res.ok) {
                alert('Zarejestrowano pomyœlnie!');
            } else {
                res.text().then(text => alert('B³¹d: ' + text));
            }
        });
    };

    return (
        <div className="register-wrapper">
            <div className="register-card">
                <p className="register-step">Krok 1/2</p>
                <h1 className="register-header">Zarejestruj konto u¿ytkownika</h1>

                <form onSubmit={handleSubmit} className="register-form">
                    <input type="text" placeholder="Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="register-input" />
                    <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="register-input" />
                    <input type="text" placeholder="User Name" value={userName} onChange={(e) => setUserName(e.target.value)} className="register-input" />
                   
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="register-input" />
                    <input type="password" placeholder="Password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className="register-input" />

                    <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} className="register-input">
                        <option value="">Choose Role</option>
                        {roles.map(role => (
                            <option key={role.roleID} value={role.roleID}>{role.roleName}</option>
                        ))}
                    </select>

                    <select value={selectedOrg} onChange={(e) => setSelectedOrg(e.target.value)} className="register-input">
                        <option value="">Choose Company</option>
                        {organizations.map(org => (
                            <option key={org.organizationID} value={org.organizationID}>{org.name}</option>
                        ))}
                    </select>

                    <button type="submit" className="register-button">Register</button>

                    <p className="register-footer-text">
                        "By registering, you accept the <a href='#'>Terms and Conditions</a> and <a href='#'>Privacy Policy</a>
                    </p>
                </form>
            </div>
        </div>
    );
}
