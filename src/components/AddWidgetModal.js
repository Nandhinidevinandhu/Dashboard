import React, { useState } from 'react';

const AddWidgetModal = ({ categories, onClose, onAddWidget }) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]?.id);
  const [widgetName, setWidgetName] = useState('');
  const [widgetText, setWidgetText] = useState('');

  const handleAdd = () => {
    if (widgetName && widgetText && selectedCategory) {
      onAddWidget(selectedCategory, widgetName, widgetText);
      onClose();
    }
  };
  

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Add Widget</h3>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Widget Name"
          value={widgetName}
          onChange={(e) => setWidgetName(e.target.value)}
        />
        <textarea
          placeholder="Widget Text"
          value={widgetText}
          onChange={(e) => setWidgetText(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default AddWidgetModal;
