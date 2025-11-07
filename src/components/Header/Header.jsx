import './Header.css'

function Header({ currentPage, onPageChange }) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <h1>🏆 Collect Master</h1>
          <span>Gerencie suas coleções com excelência</span>
        </div>
        
        <nav className="navigation">
          <button 
            className={`nav-btn ${currentPage === 'dashboard' ? 'active' : ''}`}
            onClick={() => onPageChange('dashboard')}
          >
            📊 Dashboard
          </button>
          <button 
            className={`nav-btn ${currentPage === 'collections' ? 'active' : ''}`}
            onClick={() => onPageChange('collections')}
          >
            📚 Coleções
          </button>
          <button 
            className={`nav-btn ${currentPage === 'items' ? 'active' : ''}`}
            onClick={() => onPageChange('items')}
          >
            🎯 Itens
          </button>
        </nav>

        <div className="user-info">
          <div className="user-avatar">👤</div>
          <span>Colecionador</span>
        </div>
      </div>
    </header>
  )
}

export default Header