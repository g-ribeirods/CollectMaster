import React from 'react'

function CollectionCard({ collection }) {
  return (
    <div className="collection-card">
      <div className="collection-image">
        <img src={collection.image} alt={collection.name} />
        <div className="collection-overlay">
          <button className="view-btn">👁️ Ver Detalhes</button>
        </div>
      </div>
      
      <div className="collection-info">
        <h3>{collection.name}</h3>
        <p className="collection-category">{collection.category}</p>
        
        <div className="collection-stats">
          <div className="stat">
            <span className="stat-label">Itens</span>
            <span className="stat-value">{collection.itemCount}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Valor</span>
            <span className="stat-value">R$ {collection.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
          </div>
        </div>
        
        <div className="collection-actions">
          <button className="btn-edit">✏️ Editar</button>
          <button className="btn-delete">🗑️ Excluir</button>
        </div>
      </div>
    </div>
  )
}

export default CollectionCard