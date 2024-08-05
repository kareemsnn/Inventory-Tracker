"use client";
import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import './globals.css';
import { firestore } from '../firebase.config';
import AddItem from '../components/addItem';
import { Box, Modal, Stack, TextField, Typography } from "@mui/material";
import { setDoc, getDoc, deleteDoc, doc, updateDoc, query, collection, getDocs } from 'firebase/firestore';


export default function Home() {
  const [inventory, setInventory] = useState([])
  const [open, setOpen] = useState(false)
  const [itemName, setItemName] = useState("")

  const updateInventory = async () => {
    const snapshot = await query(collection(firestore, "inventory"));
    const docs = await getDocs(snapshot);
    const inventoryList = []
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      })
    });
    setInventory(inventoryList);
  };


  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, "inventory"), item);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const {quantity} = docSnap.data();
      if (quantity > 1) {
        await updateDoc(docRef, {quantity: quantity - 1});
        updateInventory();
      }
      else {
        await deleteDoc(docRef);
      }
    }
    await updateInventory();
  };

  const addItems = async (item) => {
    const docRef = doc(collection(firestore, "inventory"), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const {quantity} = docSnap.data();
      await updateDoc(docRef, {quantity: quantity + 1});
    }
    else {
      await setDoc(docRef, {quantity: 1});
    }
    await updateInventory();
  };

  useEffect(() => {
    updateInventory();
  }, []);
  
  const handleOpen = () => {setOpen(true)}
  const handleClose = () => {setOpen(false)}

  
  return (
    <div>
      <Box 
        width="100vw"
        height="100vh"
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"  
        gap={2}
        sx={{ p: 2, border: '1px dashed white'}}
      >
        <Modal open ={open} onClose={handleClose}>
          <Box
          position="absolute"
          top="50%"
          left="50%"
          width ={400}
          bgcolor="white"
          border="2px solid #0000"
          boxShadow={24}
          p={4}
          display="flex"
          flexDirection="column"
          gap={3}
          sx={{ transform: 'translate(-50%, -50%)' }}
          >
            <Typography variant="h6" className="text-black">Add Item</Typography>
            <Stack width="100%" direction="row" spacing={2}>
              <TextField
                variant="outlined"
                fullWidth
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
              <Button variant="contained" onClick={() => {addItems(itemName); handleClose()}}>Add</Button>
            </Stack>
          </Box>
          
        </Modal>

        <Button variant="contained" onClick={handleOpen}>Add New Item</Button>

        <Box border="1px solid #333">
          <Box width="800px" height="100px" bgcolor="#ADD8E6" alignItems="center" justifyItems="center" display="flex">
            <Typography variant="h2" color="#333">
              Current Inventory:
            </Typography>
          </Box>
        
        <Stack width="800px" height="300px" spacing={2} overflow="auto">
          {
            inventory.map(({name, quantity}) => (
              <Box 
              key={name}
              width="800px" 
              height="100px" 
              spacing={2} 
              overflow="auto"
              display="flex"
              alignItems="center" 
              justifyContent="space-between" 
              bgcolor="#f0f0f0" 
              padding={5}>
                <Typography variant="h2" textAlign="center" className="text-black">
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                  </Typography>

                  <Typography variant="h2" textAlign="center" className="text-black">
                  {quantity}
                  </Typography>
                <Stack direction="row" spacing={2}>
                  <Button variant="contained" onClick={() => addItems(name)}>Add</Button>
                  <Button variant="contained" onClick={() => removeItem(name)}>Remove</Button>
                </Stack>
              </Box>
            ))
          }
        </Stack>
      </Box>
    </Box>
    </div>
  )

}
