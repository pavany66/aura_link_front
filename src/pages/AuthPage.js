import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// NEW: Wrapper to center the Auth Container
const AuthWrapper = styled.div`
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center;    /* Center vertically */
  min-height: 100vh;      /* Take up full viewport height */
  background-color: #121212; /* Dark theme background */
  padding: 20px;
`;

// --- (Keep all your existing styled-components here, no changes needed) ---
export const Container = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 900px;
  max-width: 100%;
  min-height: 500px;
  font-family: 'Inter', sans-serif;
`;
export const SignUpContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
  ${props =>
    props.signingIn !== true
      ? `
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
    `
      : null}
`;
export const SignInContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  z-index: 2;
  ${props => (props.signingIn !== true ? `transform: translateX(100%);` : null)}
`;
export const Form = styled.form`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
`;
export const Title = styled.h1`
  font-weight: bold;
  margin: 0;
`;
export const Input = styled.input`
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
  border-radius: 8px;
`;
export const Button = styled.button`
  border-radius: 20px;
  border: 1px solid #56b04dff;
  background-color: #25b88aff;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  cursor: pointer;
  &:active {
    transform: scale(0.95);
  }
  &:focus {
    outline: none;
  }
`;
export const GhostButton = styled(Button)`
  background-color: transparent;
  border-color: #ffffff;
`;
export const Anchor = styled.a`
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
`;
export const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
  ${props =>
    props.signingIn !== true ? `transform: translateX(-100%);` : null}
`;
export const Overlay = styled.div`
  background: #2adf84ff;
  background: -webkit-linear-gradient(to right, #24c08eff, #1cdb65ff);
  background: linear-gradient(to right, #25644fff, #2e656bff);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  ${props => (props.signingIn !== true ? `transform: translateX(50%);` : null)}
`;
export const OverlayPanel = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
`;
export const LeftOverlayPanel = styled(OverlayPanel)`
  transform: translateX(-20%);
  ${props => (props.signingIn !== true ? `transform: translateX(0);` : null)}
`;
export const RightOverlayPanel = styled(OverlayPanel)`
  right: 0;
  transform: translateX(0);
  ${props => (props.signingIn !== true ? `transform: translateX(20%);` : null)}
`;
export const Paragraph = styled.p`
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
`;


// --- React Component ---

function AuthPage() {
  const [signIn, toggle] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const generateStudentId = () => Math.floor(1000000000 + Math.random() * 9000000000).toString();

  async function handleSignUp(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const { data: { user }, error: authError } = await supabase.auth.signUp({ email, password });

      if (authError) throw authError;
      
      const { error: profileError } = await supabase.from('profiles').insert([
          { id: user.id, full_name: name, role: 'student', student_id: generateStudentId() }
      ]);

      if (profileError) throw profileError;
      
      alert("Signup successful! Login with your credentials now.");

    } catch (error) {
        alert("Error: " + error.message);
    } finally {
        setLoading(false);
    }
  }

  async function handleSignIn(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const { data: { user }, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) throw error;
      if (!user) throw new Error("User not found");

      const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
      
      if (profile) {
        // --- ADDED SUCCESS ALERT ---
        alert("Sign in successful! Redirecting to your dashboard...");
        // -------------------------
        
        if (profile.role === 'admin') navigate('/admin/dashboard');
        else navigate('/student/dashboard');
      } else {
          alert("Could not find user profile. Please contact support.");
      }
    } catch (error) {
        alert("Error: " + error.message);
    } finally {
        setLoading(false);
    }
  }

  return (
    <AuthWrapper>
      <Container>
        <SignUpContainer signingIn={signIn}>
          <Form onSubmit={handleSignUp}>
            <Title>Create Account</Title>
            <Input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required disabled={loading} />
            <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={loading} />
            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={loading} />
            <Button type="submit" disabled={loading}>
              {loading ? 'Signing Up...' : 'Sign Up'}
            </Button>
          </Form>
        </SignUpContainer>

        <SignInContainer signingIn={signIn}>
          <Form onSubmit={handleSignIn}>
            <Title>Sign in</Title>
            <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={loading} />
            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={loading} />
            <Anchor href="#">Forgot your password?</Anchor>
            <Button type="submit" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </Form>
        </SignInContainer>

        <OverlayContainer signingIn={signIn}>
          <Overlay signingIn={signIn}>
            <LeftOverlayPanel signingIn={signIn}>
              <Title>Welcome Back!</Title>
              <Paragraph>
                To keep connected with us login with your personal info
              </Paragraph>
              <GhostButton onClick={() => toggle(true)}>
                Sign In
              </GhostButton>
            </LeftOverlayPanel>
            <RightOverlayPanel signingIn={signIn}>
              <Title>Hello, Student!</Title>
              <Paragraph>
                  Enter your details and Start your journey with us
              </Paragraph>
              <GhostButton onClick={() => toggle(false)}>
                Sign Up
              </GhostButton>
            </RightOverlayPanel>
          </Overlay>
        </OverlayContainer>
      </Container>
    </AuthWrapper>
  );
}

export default AuthPage;