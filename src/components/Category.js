import React from 'react';

const Category = ({ category, onRemoveWidget, setCurrentCategory, setShowModal }) => {
  return (
    <div className="category">
      <h3>{category.name}</h3>
      <div className="widgets">
        {category.widgets.map(widget => (
          <div className="widget" key={widget.id}>
            <span>{widget.widgetName}</span>
            <p>{widget.widgetText}</p>
            <button className="close" onClick={() => onRemoveWidget(category.id, widget.id)}>
              &times;
            </button>
          </div>
        ))}
      </div>
      <button onClick={() => { setCurrentCategory(category); setShowModal(true); }}>+ Add Widget</button>
    </div>
  );
};

export default Category;
