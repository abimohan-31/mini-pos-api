import Sale from "../models/Sale.js";

// Get all sale
export const getAllSales = async (req, res) => {
  try {
    const sales = await Sale.find();

    res.status(200).json({
      length: sales.length,
      sales,
    });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};

// Get a sale by Id
export const getSaleById = async (req, res) => {
  try {
    const saleId = req.params.id;
    const sale = await Sale.findById({ _id: saleId });

    if (!sale) return res.status(404).json({ Message: "Sale not found" });

    res.status(200).json(sale);
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};

// Create a sale
export const createSale = async (req, res) => {
  try {
    const newSale = new Sale(req.body);

    const savedSale = await newSale.save();
    res.status(200).json({
      Message: "Sale created successfully",
      Sale: savedSale,
    });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};

// Update a sale by Id
export const updateSale = async (req, res) => {
  try {
    const saleId = req.params.id;
    const saleExist = await Sale.findById({ _id: saleId });
    if (!saleExist) return res.status(404).json({ Error: "sale not found" });

    const updatedSale = await Sale.findByIdAndUpdate(saleId, req.body, {
      new: true,
    });
    res.status(200).json({
      Message: "Sale updated successfully",
      sale: updatedSale,
    });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};

// Delete a sale by Id
export const deleteSale = async (req, res) => {
  try {
    const saleId = req.params.id;
    const sale = await Sale.findByIdAndDelete(saleId);
    if (!sale) return res.status(404).json({ Message: "Sale not found" });
    res.status(200).json({
      Message: "Sale removed successfully",
      deletedSale: sale,
    });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};
