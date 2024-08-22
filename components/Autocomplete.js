import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase.config';

export default function InventoryAutocomplete() {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const fetchInventory = async () => {
      const snapshot = await getDocs(collection(firestore, "inventory"));
      const inventoryList = [];
      snapshot.forEach((doc) => {
        inventoryList.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setInventory(inventoryList);
    };
    fetchInventory();
  }, []);

  return (
    <Autocomplete
      disablePortal
      id="inventory-autocomplete"
      options={inventory.map(item => item.name)}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Search Inventory" />}
    />
  );
}
