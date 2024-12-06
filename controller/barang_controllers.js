import { PrismaClient } from "@prisma/client";
import md5 from "md5";

const prisma = new PrismaClient();

export const getAllbarang = async (req, res) => {
  try {
    const result = await prisma.barang.findMany();
    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      msg: `msg.error${error}`,
    });
  }
}
export const getbarangById = async (req, res) => {
  try {
    const result = await prisma.barang.findUnique({
      where: {
        id_barang: Number(req.params.id),
      },
    });
    if (result) {
      res.status(200).json({
        success: true,
        data: result,
      });
    } else {
      res.status(401).json({
        success: false,
        message: "data not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: error,
    });
  }
}
export const addbarang = async (req, res) => {
  try {
    const { name, category, location, quantity,status } = req.body;

    const nameCheck = await prisma.barang.findFirst({
      where: {
        nama_barang: name,
      },
    });
    if (nameCheck) {
      res.status(401).json({
        msg: "barang sudah ada",
      });
    } else {
      const result = await prisma.barang.create({
        data: {
          nama_barang: name,
          kategori: category,
          location: location,
          jumlah: quantity,
          status: status
        },
      });
      res.status(201).json({
        success: true,
        message: "barang berhasil ditambah",
        data: result,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      msg: `error${error}`,
    });
  }
}
export const updatebarang = async (req, res) => {
  try {
    const { name, category, location, quantity, status } = req.body;

    const dataCheck = await prisma.barang.findUnique({
      where: {
        id_barang: Number(req.params.id),
      },
    });
    if (!dataCheck) {
      res.status(401).json({
        msg: "data tidak ditemukan",
      });
    } else {
      const result = await prisma.barang.update({
        where: {
          id_barang: Number(req.params.id),
        },
        data: {
          nama_barang: name,
          kategori: category,
          location: location,
          jumlah: quantity,
          status: status
        },
      });
      res.json({
        success: true,
        message: "Pengguna berhasil diubah",
        data: result,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      msg: error,
    });
  }
}
export const deletebarang = async (req, res) => {
  try {
    const dataCheck = await prisma.barang.findUnique({
      where: {
        id_barang: Number(req.params.id),
      },
    });
    if (!dataCheck) {
      res.status(401).json({
        msg: "data tidak ditemukan",
      });
    } else {
      const result = await prisma.barang.delete({
        where: {
          id_barang: Number(req.params.id),
        },
      });
      res.json({
        success: true,
        message: "Data berhasil dihapus",
        data: result,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      msg: error,
    });
  }
}
