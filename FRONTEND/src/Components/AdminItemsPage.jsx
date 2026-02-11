import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Box,
  Typography,
  MenuItem,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

const AdminItemsPage = () => {
  const baseurl = import.meta.env.VITE_API_BASE_URL || '';
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    quantityNeeded: 0,
    priority: 'Medium',
    category: 'Other',
  });

  useEffect(() => {
    fetchItems();
  }, []);

  // 🔐 Get token from storage
  const getToken = () => localStorage.getItem("token");

  // 🚀 Fetch items with token
  const fetchItems = async () => {
    try {
      const token = getToken();

      const res = await axios.get(`${baseurl}/api/admin/items`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const cleaned = Array.isArray(res.data)
        ? res.data.filter((item) => item && typeof item === "object" && item._id)
        : [];

      setItems(cleaned);

    } catch (err) {
      console.error("❌ Error fetching items:", err);
      setItems([]);
    }
  };

  const handleOpen = (item = null) => {
    setEditItem(item);
    setFormData(
      item || { name: '', description: '', quantityNeeded: 0, priority: 'Medium', category: 'Other' }
    );
    setOpen(true);
  };

  const handleSubmit = async () => {
    try {
      const token = getToken();

      if (editItem) {
        // UPDATE
        await axios.put(`${baseurl}/api/admin/items/${editItem._id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        // CREATE
        await axios.post(`${baseurl}/api/admin/items`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      setOpen(false);
      fetchItems();

    } catch (err) {
      console.error("❌ Error saving item:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = getToken();

      await axios.delete(`${baseurl}/api/admin/items/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchItems();

    } catch (err) {
      console.error("❌ Error deleting item:", err);
    }
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 160 },
    { field: 'description', headerName: 'Description', width: 260 },
    { field: 'quantityNeeded', headerName: 'Qty Needed', width: 130 },
    { field: 'priority', headerName: 'Priority', width: 130 },
    { field: 'category', headerName: 'Category', width: 130 },

    {
      field: 'actions',
      headerName: 'Actions',
      width: 180,
      renderCell: (params) => (
        <>
          <Button
            variant="outlined"
            onClick={() => handleOpen(params.row)}
            size="small"
            sx={{ mr: 1 }}
          >
            Edit
          </Button>

          <Button
            variant="outlined"
            onClick={() => handleDelete(params.row._id)}
            size="small"
            color="error"
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Manage Needed Items
      </Typography>

      <Button
        variant="contained"
        onClick={() => handleOpen()}
        sx={{ mb: 2 }}
      >
        Add Item
      </Button>

      {/* 📌 SAFE DataGrid */}
      <DataGrid
        rows={items}
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={5}
        autoHeight
      />

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>{editItem ? 'Edit Item' : 'Add Item'}</DialogTitle>

        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            sx={{ mb: 2 }}
          />

          <TextField
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            sx={{ mb: 2 }}
          />

          <TextField
            label="Quantity Needed"
            type="number"
            fullWidth
            value={formData.quantityNeeded}
            onChange={(e) =>
              setFormData({
                ...formData,
                quantityNeeded: Number(e.target.value),
              })
            }
            sx={{ mb: 2 }}
          />

          <TextField
            select
            label="Priority"
            fullWidth
            value={formData.priority || 'Medium'}
            onChange={(e) =>
              setFormData({ ...formData, priority: e.target.value })
            }
            sx={{ mb: 2 }}
          >
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
          </TextField>

          <TextField
            select
            label="Category"
            fullWidth
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            sx={{ mb: 2 }}
          >
            <MenuItem value="Food">Food</MenuItem>
            <MenuItem value="Clothes">Clothes</MenuItem>
            <MenuItem value="Sanitary">Sanitary</MenuItem>
            <MenuItem value="Drinks">Drinks</MenuItem>
            <MenuItem value="Stationary">Stationary</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>

          <Button onClick={handleSubmit} variant="contained" fullWidth>
            Save
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default AdminItemsPage;
