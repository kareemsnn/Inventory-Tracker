"use client";
import { useState } from "react";
import Button from '@mui/material/Button';
import './globals.css';
import { firestore } from '../firebase.config';
import AddItem from '../components/addItem';
import { collection, getDocs } from "firebase/firestore";

// const AddItem = () => {
//   const [name, setName] = useState("");
//   const [quantity, setQuantity] = useState("");

//   const addItem = async () => {
//     try {
//       await firestore.collection("inventory").add({
//         name: name,
//         quantity: quantity,
//       });
//       setName("")
//       setQuantity("")
//       console.log("Document written with ID: ", docRef.id);
//     } catch (e) {
//       console.error("Error adding document: ", e);
//     }
//   };
// };

export default function Home() {
  return (
    <div className="text-3xl height-full">
      <h1 className="text-4xl">Inventory Tracker</h1>
      {/* <Button 
      variant="contained"
      onClick={() => {
        // AddItem();
      }}
      >
        Hello World
        </Button> */}

      <AddItem />
      
    </div>
  )

}
