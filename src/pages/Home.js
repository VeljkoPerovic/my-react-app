import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/main.scss";
import DeleteItemButton from "../services/Delete";
import EditItemForm from "../services/EditItemForm";
import AddItemModal from "../services/AddItemModal";
import edit from "../images/pen.png";
import moment from "moment";
import add from "../images/add.png";
import ArticleDetails from "../services/ArticleDetails";

export default function Home() {
  const [items, setItems] = useState([]);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [editedItem, setEditedItem] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addingItem, setAddingItem] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const handleArticleDetails = (article) => {
    setSelectedArticle(article);
  };

  const handleCloseArticleDetails = () => {
    setSelectedArticle(null);
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        const mappedData = data.map((item) => ({
          ...item,
          date: moment(item.date).format("LLLL"),
        }));
        setItems(mappedData);
        setDisplayedItems(mappedData.slice(0, 10));
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleDeleteItem = (itemId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    setDisplayedItems((prevDisplayedItems) =>
      prevDisplayedItems.filter((item) => item.id !== itemId)
    );
  };

  const handleEditItem = (itemId) => {
    const itemToEdit = items.find((item) => item.id === itemId);
    setEditedItem(itemToEdit);
  };

  const handleSaveEdit = (updatedItem) => {
    const editedIndex = items.findIndex((item) => item.id === updatedItem.id);
    const updatedItems = [...items];
    updatedItems[editedIndex] = updatedItem;
    setItems(updatedItems);
    setDisplayedItems(updatedItems.slice(0, 10));
    setEditedItem(null);
  };

  const handleCancelEdit = () => {
    setEditedItem(null);
  };

  const handleAddItemClick = () => {
    setShowAddModal(true);
  };

  const handleAddItem = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
    setDisplayedItems((prevDisplayedItems) => [...prevDisplayedItems, newItem]);
    setShowAddModal(false);
  };

  const handleCancelAdd = () => {
    setShowAddModal(false);
  };

  return (
    <Layout>
      <Header />

      <div className="scrollable-box">
        <div className="item-grid">
          {displayedItems.map((item) => (
            <div key={item.id} className="item">
              <div className="item-header">
                <span className="item-date">{item.date}</span>
                {addingItem || (editedItem && editedItem.id === item.id) ? (
                  <>
                    <img
                      src={edit}
                      className="icon-edit"
                      alt="Cancel"
                      onClick={() => handleCancelEdit()}
                    />
                  </>
                ) : (
                  <>
                    <img
                      src={add}
                      className="icon-add"
                      alt="Add"
                      onClick={() => handleArticleDetails(item)}
                    />
                    <img
                      src={edit}
                      className="icon-edit"
                      alt="Edit"
                      onClick={() => handleEditItem(item.id)}
                    />
                    <DeleteItemButton
                      onDelete={handleDeleteItem}
                      itemId={item.id}
                    />
                  </>
                )}
              </div>
              {editedItem && editedItem.id === item.id ? (
                <EditItemForm
                  editedItem={editedItem}
                  onSaveEdit={handleSaveEdit}
                  onCancelEdit={handleCancelEdit}
                />
              ) : (
                <>
                  <h3>{item.title}</h3>
                  <p style={{ color: "rgb(80, 80, 139)" }}>{item.body}</p>
                </>
              )}
            </div>
          ))}
        </div>

        {displayedItems.length === 0 && (
          <>
            <p style={{ textAlign: "center", fontSize: "40px" }}>
              No articles in the box
            </p>
          </>
        )}
      </div>
      {showAddModal && (
        <AddItemModal onAddItem={handleAddItem} onCancelAdd={handleCancelAdd} />
      )}
      <button className="add-btn-empty" onClick={handleAddItemClick}>
        ADD ARTICLE
      </button>
      {selectedArticle && (
        <ArticleDetails
          article={selectedArticle}
          onClose={handleCloseArticleDetails}
        />
      )}

      <Footer />
    </Layout>
  );
}
