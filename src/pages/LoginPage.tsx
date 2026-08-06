import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

const LoginPage = () => {
  const navigate = useNavigate()
  const { login, isAuthenticated, error } = useAuthStore()

  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [submitted, setSubmitted] = useState(false)

  // Si ya hay sesión activa, redirige directo
  useEffect(() => {
    if (isAuthenticated) navigate('/', { replace: true })
  }, [isAuthenticated, navigate])

  const emailError = submitted && !email    ? 'Ingresa tu correo' : ''
  const passError  = submitted && !password ? 'Ingresa tu contraseña' : ''

  const handleSubmit = () => {
    setSubmitted(true)
    if (!email || !password) return
    const ok = login(email, password)
    if (ok) navigate('/')
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        {/* Logo */}
        <div style={styles.logo}>▶ AyudaMemoria.dev</div>

        <h2 style={styles.title}>Bienvenido de nuevo</h2>
        <p style={styles.sub}>Inicia sesión para acceder a tus clases.</p>

        {/* Error de autenticación */}
        {error && submitted && (
          <div style={styles.alertError}>{error}</div>
        )}

        {/* Campo email */}
        <div style={styles.field}>
          <label style={styles.label}>Correo electrónico</label>
          <input
            style={{
              ...styles.input,
              borderColor: emailError ? '#ef4444' : '#e5e7eb',
            }}
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          />
          {emailError && <span style={styles.fieldError}>{emailError}</span>}
        </div>

        {/* Campo password */}
        <div style={styles.field}>
          <label style={styles.label}>Contraseña</label>
          <input
            style={{
              ...styles.input,
              borderColor: passError ? '#ef4444' : '#e5e7eb',
            }}
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          />
          {passError && <span style={styles.fieldError}>{passError}</span>}
        </div>

        {/* Botón */}
        <button style={styles.btn} onClick={handleSubmit}>
          Iniciar sesión
        </button>

        {/* Hint usuarios */}
        <div style={styles.hint}>
          <strong>Usuarios de prueba:</strong><br />
          ana.estudiante@cursos.com / alumna123<br />
          admin@cursos.com / admin123
        </div>

      </div>
    </div>
  )
}

// Estilos inline (sin dependencias extra)
const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: '#f3f4f6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Inter, system-ui, sans-serif',
  },
  card: {
    background: 'white',
    borderRadius: '16px',
    padding: '40px',
    width: '100%',
    maxWidth: '420px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
  },
  logo: {
    color: '#7c3aed',
    fontWeight: 700,
    fontSize: '16px',
    marginBottom: '24px',
  },
  title: {
    fontSize: '22px',
    fontWeight: 700,
    color: '#111827',
    margin: '0 0 4px',
  },
  sub: {
    fontSize: '14px',
    color: '#6b7280',
    margin: '0 0 24px',
  },
  alertError: {
    background: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: '8px',
    padding: '10px 14px',
    color: '#dc2626',
    fontSize: '13px',
    marginBottom: '16px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '16px',
  },
  label: {
    fontSize: '13px',
    fontWeight: 500,
    color: '#374151',
    marginBottom: '6px',
  },
  input: {
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    fontSize: '14px',
    outline: 'none',
    background: '#f9fafb',
  },
  fieldError: {
    fontSize: '12px',
    color: '#ef4444',
    marginTop: '4px',
  },
  btn: {
    width: '100%',
    padding: '11px',
    background: '#7c3aed',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
    marginTop: '4px',
  },
  hint: {
    marginTop: '20px',
    background: '#f5f3ff',
    border: '1px solid #ede9fe',
    borderRadius: '8px',
    padding: '12px',
    fontSize: '12px',
    color: '#5b21b6',
    lineHeight: 1.7,
  },
}

export default LoginPage