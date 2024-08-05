import { useState } from "react";
import { firestore } from "../firebase.config";
import { doc, setDoc, addDoc, collection, updateDoc } from "firebase/firestore";

const AddItem = () => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [password, setPassword] = useState("");
  // const collectionRef = collection(firestore, "inventory");

  const addItem = async () => {
    try {
      const inventoryCollectionRef = collection(firestore, "inventory");
      const itemDocRef = doc(inventoryCollectionRef, name); // Create a reference with the specified document ID (name)
      const docData = {
        quantity: quantity,
        password: password,
      };
      await addDoc(itemDocRef, docData); // Use setDoc to add data with the specified document ID
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
        type="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
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
