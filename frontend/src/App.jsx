import React, { useEffect, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { MonacoBinding } from './y-monaco-local';
// Using raw SVGs instead of lucide-react to avoid dependency issues
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const ShareIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>;

function App() {
  const editorRef = useRef(null);
  const [roomId, setRoomId] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Generate or get Room ID from URL hash
    let hash = window.location.hash.replace('#', '');
    if (!hash) {
      hash = Math.random().toString(36).substring(2, 10);
      window.location.hash = hash;
    }
    setRoomId(hash);
  }, []);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;

    // Initialize Yjs
    const doc = new Y.Doc();
    
    // Connect to the backend WebSocket
    // Use the environment variable from Vercel/Render, or fallback to localhost
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'ws://localhost:5001';
    
    const provider = new WebsocketProvider(
      backendUrl, 
      `collab-room-${roomId}`, 
      doc
    );

    const type = doc.getText('monaco');

    // Bind Yjs to Monaco using the local binding
    const binding = new MonacoBinding(
      monaco,
      type, 
      editorRef.current.getModel(), 
      new Set([editorRef.current]), 
      provider.awareness
    );

    console.log(`✅ Connected to Room: ${roomId}`);
  }

  const copyInviteLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={styles.container}>
      {/* Premium Glassmorphism Header */}
      <nav style={styles.nav}>
        <div style={styles.brand}>
          <div style={styles.logoIcon}>🚀</div>
          <h1 style={styles.title}>CollabCode <span style={styles.proBadge}>PRO</span></h1>
        </div>

        <div style={styles.actions}>
          <div style={styles.roomInfo}>
            <UsersIcon />
            <span style={styles.roomLabel}>Room:</span>
            <code style={styles.roomCode}>{roomId}</code>
          </div>
          
          <button onClick={copyInviteLink} style={copied ? styles.buttonSuccess : styles.button}>
            {copied ? <CheckIcon /> : <ShareIcon />}
            <span>{copied ? 'Link Copied!' : 'Invite Friend'}</span>
          </button>
        </div>
      </nav>

      <main style={styles.editorContainer}>
        <Editor
          height="100%"
          defaultLanguage="javascript"
          defaultValue="// Welcome to CollabCode!
// 1. Share the URL with a friend.
// 2. Start coding together in real-time.
// 3. Enjoy the power of Yjs + Monaco.

function helloWorld() {
  console.log('Happy Coding! 🚀');
}
"
          theme="vs-dark"
          onMount={handleEditorDidMount}
          options={{
            fontSize: 15,
            fontFamily: "'Fira Code', 'Cascadia Code', Consolas, monospace",
            minimap: { enabled: true },
            automaticLayout: true,
            padding: { top: 20 },
            smoothScrolling: true,
            cursorBlinking: 'smooth',
            lineNumbersMinChars: 3,
          }}
        />
      </main>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: '#0a0a0a',
    color: '#e0e0e0',
    fontFamily: "'Inter', sans-serif",
  },
  nav: {
    height: '70px',
    padding: '0 2rem',
    background: 'rgba(25, 25, 25, 0.8)',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 100,
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  logoIcon: {
    fontSize: '1.5rem',
    background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '10px',
    boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)',
  },
  title: {
    fontSize: '1.25rem',
    fontWeight: 700,
    margin: 0,
    letterSpacing: '-0.5px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  proBadge: {
    fontSize: '0.65rem',
    background: 'rgba(99, 102, 241, 0.1)',
    color: '#818cf8',
    padding: '2px 6px',
    borderRadius: '4px',
    border: '1px solid rgba(99, 102, 241, 0.2)',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  roomInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: 'rgba(255, 255, 255, 0.03)',
    padding: '6px 12px',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.05)',
  },
  roomLabel: {
    fontSize: '0.8rem',
    color: '#888',
  },
  roomCode: {
    fontSize: '0.85rem',
    color: '#a855f7',
    fontWeight: 600,
    background: 'transparent',
    padding: 0,
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: '#6366f1',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: 600,
    transition: 'all 0.2s ease',
  },
  buttonSuccess: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: '#10b981',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: 600,
    transition: 'all 0.2s ease',
  },
  editorContainer: {
    flexGrow: 1,
    overflow: 'hidden',
  }
};

export default App;