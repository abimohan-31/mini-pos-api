import Item from "../models/Item.js";

// Get all item
export const getAllItems = async (req, res) => {
  try {
    const items = await Item.find();

    res.status(200).json({
      length: items.length,
      items,
    });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};

// Get a item by Id
export const getItemById = async (req, res) => {
  try {
    const itemId = req.params.id;
    const item = await Item.findById({ _id: itemId });

    if (!item) return res.status(404).json({ Message: "Item not found" });

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};

// Create a item
export const createItem = async (req, res) => {
  try {
    const newItem = new Item(req.body);

    const savedItem = await newItem.save();
    res.status(200).json({
      Message: "Item created successfully",
      Item: savedItem,
    });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};

// Update a item by Id
export const updateItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const itemExist = await Item.findById({ _id: itemId });
    if (!itemExist) return res.status(404).json({ Error: "item not found" });

    const updatedItem = await Item.findByIdAndUpdate(itemId, req.body, {
      new: true,
    });
    res.status(200).json({
      Message: "Item updated successfully",
      Item: updatedItem,
    });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};

// Delete a item by Id
export const deleteItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const item = await Item.findByIdAndDelete(itemId);
    if (!item) return res.status(404).json({ Message: "Item not found" });
    res.status(200).json({
      Message: "Item removed successfully",
      deletedItem: item,
    });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};
