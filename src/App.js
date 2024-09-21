import React, { useState,useEffect } from 'react';
import { dashboardData } from './data';
import Category from './components/Category';
import AddWidgetModal from './components/AddWidgetModal';
import './App.css';

const App = () => {
  const [categories, setCategories] = useState(dashboardData.categories);
  const [showModal, setShowModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);

  useEffect(() => {
    const savedCategories = localStorage.getItem('categories');
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    }
  }, []);

  // Save categories to local storage
  const saveCategoriesToLocalStorage = (updatedCategories) => {
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
  };

  const handleAddWidget = (categoryId, widgetName, widgetText) => {
    const updatedCategories = categories.map((category) =>
      category.id === categoryId
        ? {
            ...category,
            widgets: [
              ...category.widgets,
              { id: Date.now(), widgetName, widgetText },
            ],
          }
        : category
    );
    setCategories(updatedCategories);
    saveCategoriesToLocalStorage(updatedCategories);
  };
  const handleRemoveWidget = (categoryId, widgetId) => {
    setCategories(categories.map(category =>
      category.id === categoryId
        ? {
            ...category,
            widgets: category.widgets.filter(widget => widget.id !== widgetId)
          }
        : category
    ));
  };

  return (
    <div className="App">
      <div className="header">
        <span className="breadcrumb">Home &gt; Dashboard</span>
        <div className="window-controls">
        <div className="search-bar">
            <input type="text" placeholder="Search Widgets" />
          </div>
          <button className="icon-button">_</button>
          <button className="icon-button">☐</button>
          <button className="icon-button">×</button>
        </div>
      </div>
      <div className="cnapp-header">
        <span className="cnapp-title">CNAPP Dashboard</span>
        <div className="cnapp-actions">
          <button onClick={() => setShowModal(true)}>+ Add Widget</button>
          <button className="icon-button">⟳</button>
          <button className="icon-button">⋮</button>
          <button className="icon-button">Last 2 days</button>
        </div>
      </div>

      {categories.map(category => (
        <Category
          key={category.id}
          category={category}
          onRemoveWidget={handleRemoveWidget}
          setCurrentCategory={setCurrentCategory}
          setShowModal={setShowModal}
        />
      ))}
      
      {showModal && (
        <AddWidgetModal
          categories={categories}
          onClose={() => setShowModal(false)}
          onAddWidget={handleAddWidget}
        />
      )}
    </div>
  );
};

export default App;
