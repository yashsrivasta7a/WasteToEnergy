import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from '../components/Logout';
import Navbar from '../components/Navbar';

function Profile() {
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <div style={{
            fontFamily:"Outfit",
            fontSize:"2rem",
            textAlign:"center",
            position:'relative',
            top:"45vh"
        }}>Loading Your Profile.............</div>;
    }

    return (
        isAuthenticated && (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap:'2rem'
            }}>
                <Navbar/>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    background:'#fff7db',
                    borderRadius: '2rem',
                    padding: '2rem',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, .5)',
                    maxWidth: '800px',
                    
                    width: '100%',
                }}>
                    <img 
                        src={user.picture} 
                        alt={user.name} 
                        style={{
                            borderRadius: '50%',
                            width: '150px',
                            height: '150px',
                            marginBottom: '1rem',
                        }} 
                    />
                    <h1 style={{ margin: '0.5rem 0', color: '#333' }}>{user.name}</h1>
                    <p style={{ margin: '0.25rem 0', color: '#666' }}>{user.email}</p>
                    <div style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: '1rem', 
                        marginTop: '2rem', 
                        width: '100%' 
                    }}>
                        <div style={{ 
                            background: '#90ee90', 
                            borderRadius: '1rem', 
                            padding: '1rem', 
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)' 
                        }}>
                            <h3 style={{ margin: '0 0 0.5rem 0', color: '#444' }}>Personal Information</h3>
                            <p style={{ margin: '0.25rem 0', color: '#666' }}><strong>Nickname:</strong> {user.nickname}</p>
                        </div>
                        <div style={{ 
                            background: '#90ee90', 
                            borderRadius: '1rem', 
                            padding: '1rem', 
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)' 
                        }}>
                            <h3 style={{ margin: '0 0 0.5rem 0', color: '#444' }}>Additional Information</h3>
                            <p style={{ margin: '0.25rem 0', color: '#666' }}><strong>Email Verified:</strong> {user.email_verified ? 'Yes' : 'No'}</p>
                            <p style={{ margin: '0.25rem 0', color: '#666' }}><strong>User ID:</strong> {user.sub}</p>
                        </div>
                    </div>
                    <LogoutButton/>
                </div>
            </div>
            
        )
    );
}

export default Profile;