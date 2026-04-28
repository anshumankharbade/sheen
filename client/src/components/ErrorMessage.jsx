const ErrorMessage = ({ message }) => (
  <div style={{ textAlign: 'center', padding: '6rem 2rem' }}>
    <p style={{ color: '#e07070', fontSize: '14px', letterSpacing: '0.05em' }}>{message || 'Something went wrong.'}</p>
  </div>
);
export default ErrorMessage;
