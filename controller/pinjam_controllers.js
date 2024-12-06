import { PrismaClient } from "@prisma/client";
import console, { group } from "console";
import { get } from "http";
import { it } from "node:test";



function isValidDate(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}$/; // Regex for YYYY-MM-DD format
  return regex.test(dateString);
}

const prisma = new PrismaClient();

export const getAllPeminjaman = async (req, res) => {
  try {
    const result = await prisma.peminjaman.findMany();
    const formattedData = result.map((record) => {
      const formattedBorrowDate = new Date(record.borrow_date)
        .toISOString()
        .split("T")[0];
      const formattedReturnDate = new Date(record.return_date)
        .toISOString()
        .split("T")[0];
      return {
        ...record,
        borrow_date: formattedBorrowDate,
        return_date: formattedReturnDate,
      };
    });

    res.json({
      success: true,
      data: formattedData,
    });
  } catch (error) {
    console.log(error);
    res.json({
      msg: error,
    });
  }
};
export const getPeminjamanById = async (req, res) => {
  try {
    const result = await prisma.peminjaman.findUnique({
      where: {
        id_peminjaman: Number(req.params.id),
      },
    });

    // Check if result is null
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Data not found",
      });
    }

    // Format the single record
    const formattedBorrowDate = new Date(result.borrow_date)
      .toISOString()
      .split("T")[0];
    const formattedReturnDate = new Date(result.return_date)
      .toISOString()
      .split("T")[0];

    // Create a formatted response object
    const formattedData = {
      ...result,
      borrow_date: formattedBorrowDate,
      return_date: formattedReturnDate,
    };

    res.json({
      success: true,
      data: formattedData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: error.message || "Internal server error",
    });
  }
};
export const addPeminjaman = async (req, res) => {
  const { id_user, item_id, borrow_date, return_date, qty } = req.body;

  const formattedBorrowDate = new Date(borrow_date).toISOString(); 
  const formattedReturnDate = new Date(return_date).toISOString();

  const [getUserId, getBarangId] = await Promise.all([
    prisma.user.findUnique({ where: { id_user: Number(id_user) } }),
    prisma.barang.findUnique({ where: { id_barang: Number(item_id) } }),
  ]);
  
  if (getUserId && getBarangId) {
    try {
      // Check available quantity before proceeding
      const item = await prisma.barang.findUnique({
        where: { id_barang: Number(item_id) },
      });

      if (!item) {
        return res.status(404).json({
          success: false,
          message: `Barang dengan id_barang ${item_id} tidak ditemukan`
        });
      }

      // Check if requested quantity exceeds available quantity
      if (qty > item.jumlah) {
        return res.status(400).json({
          success: false,
          message: `Jumlah yang diminta (${qty}) melebihi jumlah yang tersedia (${item.jumlah}).`
        });
      }

      // Proceed to create the borrowing record
      const result = await prisma.peminjaman.create({
        data: {
          User: {
            connect: {
              id_user: Number(id_user),
            },
          },
          Barang: {
            connect: {
              id_barang: Number(item_id),
            },
          },
          qty: qty,
          borrow_date: formattedBorrowDate,
          return_date: formattedReturnDate,
        }
      });

      // Update the item's quantity after successful borrowing
      const minQty = item.jumlah - qty;
      await prisma.barang.update({
        where: {
          id_barang: Number(item_id),
        },
        data: {
          jumlah: minQty,
        },
      });

      // Respond with success message
      res.status(201).json({
        success: true,
        message: "Peminjaman Berhasil Dicatat",
        data: {
          id_user: result.id_user,
          id_barang: result.id_barang,
          qty: result.qty,
          borrow_date: result.borrow_date.toISOString().split("T")[0], 
          return_date: result.return_date.toISOString().split("T")[0], 
          status: result.status,
        },
      });
      
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        msg: error.message || "Internal server error",
      });
    }
  } else {
    res.status(404).json({ 
      success: false, 
      msg: "User dan barang belum ada" 
    });
  }
};
export const pengembalianBarang = async (req, res) => {
  const { borrow_id, return_date, Status } = req.body;

  
  const formattedReturnDate = new Date(return_date).toISOString();

  try {
   
    const cekBorrow = await prisma.peminjaman.findUnique({
      where: { id_peminjaman: Number(borrow_id) },
    });

    // Check if cekBorrow is null
    if (!cekBorrow) {
      return res.status(404).json({
        success: false,
        message: "Peminjaman tidak ditemukan.",
      });
    }

    // Check if the status is 'dipinjam'
    if (cekBorrow.status === 'dipinjam') {
      // Update the peminjaman record
      const result = await prisma.peminjaman.update({
        where: {
          id_peminjaman: borrow_id,
        },
        data: {
          return_date: formattedReturnDate,
          status: 'dikembalikan', // Ensure this is a string or variable defined elsewhere
        },
      });

      // Find the associated item
      const item = await prisma.barang.findUnique({
        where: { id_barang: Number(cekBorrow.id_baranG) }, // Corrected variable name to match schema
      });

      if (!item) {
        throw new Error(`Barang dengan id_barang ${cekBorrow.id_barang} tidak ditemukan`);
      } else {
        // Restore quantity in barang table
        const restoreQty = cekBorrow.qty + item.jumlah;
        await prisma.barang.update({
          where: {
            id_barang: Number(cekBorrow.id_baranG),
          },
          data: {
            jumlah: restoreQty,
          },
        });
      }

      res.status(201).json({
        success: true,
        message: "Pengembalian Berhasil Dicatat",
        data: {
          id_peminjaman: result.id_peminjaman,
          id_user: result.id_user,
          id_barang: result.id_barang,
          qty: result.qty,
          return_date: result.return_date.toISOString().split("T")[0], // Format tanggal (YYYY-MM-DD)
          status: result.status,
        },
      });
    } else {
      res.status(400).json({ 
        success: false, 
        message: "Status peminjaman tidak valid." 
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: error.message || "Internal server error",
    });
  }
};
export const usageReport = async (req, res) => {
  const { start_date, end_date, category, location, group_by, nama_baraNG } = req.body;

  const formattedStartDate = new Date(start_date).toISOString();
  const formattedEndDate = new Date(end_date).toISOString();

  try {
    // Conditional filters for category and location
    const items = await prisma.barang.findMany({
      where: {
        AND: [
          category ? { kategori: { contains: category } } : {},
          location ? { location: { contains: location } } : {},
        ],
      },
    });

    
    if (items.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "No items found for the given filters.",
      });
    }

    // Get borrow records within the date range
    const borrowRecords = await prisma.peminjaman.findMany({
      where: {
        borrow_date: { gte: formattedStartDate },
        return_date: { lte: formattedEndDate },
      },
    });
    
    const validGroupBy = ["kategori", "lokasi"];
    if (!validGroupBy.includes(group_by)) {
      return res.status(400).json({
        status: "fail",
        message: `Invalid group_by value. Must be one of: ${validGroupBy.join(", ")}`,
      });
    }
    // Group data based on item category
    const analysis = items.map((item) => {
      const relevantBorrows = borrowRecords.filter(
        (record) => record.id_baranG === item.id_barang
      );

      const totalBorrowed = relevantBorrows.reduce(
        (sum, record) => sum + record.qty,
        0
      );

      const totalReturned = relevantBorrows.reduce(
        (sum, record) => (record.status === "dikembalikan" ? sum + record.qty : sum),
        0
      );

     


      return {
        group: group_by === 'kategori' ? item.kategori : item.location,
        nama: item.nama_barang,
        item_id: item.id_barang,
        total_borrowed: totalBorrowed,
        total_returned: totalReturned,
        item_in_use: totalBorrowed-totalReturned,
      };
    });

    // Send the response with usage analysis
    res.status(200).json({
      status: "success",
      data: {
        analysis_period: {
          start_date,
          end_date,
          group,
          nama_baraNG
        },
        usage_analysis: analysis,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "An error occurred while processing the usage report.",
      error: `${error}`,
    });
  }
};
export const pinjamanalisis = async (req, res) => {
  const { start_date, end_date, category, location, group_by, nama_baraNG } = req.body;

  const formattedStartDate = new Date(start_date).toISOString();
  const formattedEndDate = new Date(end_date).toISOString();

  try {
    // Conditional filters for category and location
    const items = await prisma.barang.findMany({
      where: {
        AND: [
          category ? { kategori: { contains: category } } : {},
          location ? { location: { contains: location } } : {},
        ],
      },
    });

    // Check if any items were found
    if (items.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "No items found for the given filters.",
      });
    }

    // Get borrow records within the date range
    const borrowRecords = await prisma.peminjaman.findMany({
      where: {
        borrow_date: { gte: formattedStartDate },
        return_date: { lte: formattedEndDate },
      },
    });

    // Group data based on item category
    const analysis = items.map((item) => {
      const relevantBorrows = borrowRecords.filter(
        (record) => record.id_baranG === item.id_barang
      );

      const totalBorrowed = relevantBorrows.reduce(
        (sum, record) => sum + record.qty,
        0
      );

      const totalReturned = relevantBorrows.reduce(
        (sum, record) => (record.status === "kembali" ? sum + record.qty : sum),
        0
      );

      return {
        
        nama: item.nama_barang,
        item_id: item.id_barang,
        category:item.kategori,
        jumlah_barang: item.jumlah,
        total_borrowed: totalBorrowed,
        total_returned: totalReturned,
        items_in_use: totalBorrowed - totalReturned,
      };
    });

    // Send the response with usage analysis
    res.status(200).json({
      status: "success",
      data: {
        analysis_period: {
          start_date,
          end_date,
          nama_baraNG
        },
        usage_analysis: analysis,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "An error occurred while processing the usage report.",
      error: `${error}`,
    });
  }
};