import { useState } from "react";
import { firestore } from "../firebase.config";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";

const AddItem = () => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const collectionRef = collection(firestore, "inventory");

  const addItem = async () => {
    try {
      const docRef = doc(firestore, "inventory"); // Create a reference to the document
      const docData = {
        name: name,
        quantity: quantity,
      };
      await setDoc(docRef, docData); // Add data to the document
      console.log("Item added successfully!");
    } catch (error) {
      console.error("Error adding item: ", error);
    }
  };

  return (
    <div>
      <input
        className = "text-black"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Item Name"
      />
      <input
        className = "text-black"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Quantity"
      />
      <button onClick={addItem}>Add Item</button>
    </div>
  );
};

export default AddItem;
