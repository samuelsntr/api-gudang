-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 27, 2025 at 02:54 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gudang`
--

-- --------------------------------------------------------

--
-- Table structure for table `barangs`
--

CREATE TABLE `barangs` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `jenis` enum('bahan_baku','setengah_jadi','barang_jadi') NOT NULL,
  `satuan` varchar(255) NOT NULL,
  `stok` int(11) DEFAULT 0,
  `harga_beli` decimal(15,2) NOT NULL,
  `harga_jual` decimal(15,2) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `hpp` decimal(15,2) NOT NULL DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `barangs`
--

INSERT INTO `barangs` (`id`, `nama`, `jenis`, `satuan`, `stok`, `harga_beli`, `harga_jual`, `createdAt`, `updatedAt`, `hpp`) VALUES
(10, 'Tepung', 'bahan_baku', 'kg', 191, '31000.00', '0.00', '2025-04-25 13:21:29', '2025-05-10 07:57:16', '0.00'),
(12, 'Gula Pasir', 'bahan_baku', 'kg', 114, '10000.00', '0.00', '2025-04-25 13:27:09', '2025-05-10 07:57:16', '0.00'),
(18, 'Pail 5L', 'barang_jadi', 'pcs', 87, '0.00', '0.00', '2025-05-09 08:50:26', '2025-05-27 08:27:37', '87.00'),
(19, 'Cup Cathering', 'barang_jadi', 'pcs', 246, '0.00', '0.00', '2025-05-09 08:50:41', '2025-05-20 13:04:16', '258.80'),
(20, 'Cup 120 ml', 'barang_jadi', 'pcs', 196, '0.00', '0.00', '2025-05-09 08:51:00', '2025-05-27 11:22:40', '368.00'),
(21, 'Es Cincau', 'setengah_jadi', 'liter', 54, '10000.00', '12000.00', '2025-05-09 11:13:34', '2025-05-16 13:29:52', '19076.92'),
(22, 'Es Puter', 'setengah_jadi', 'liter', 66, '0.00', '0.00', '2025-05-09 12:22:35', '2025-05-16 13:29:52', '290.00'),
(23, 'Es Goyang', 'setengah_jadi', 'liter', 197, '0.00', '0.00', '2025-05-09 12:22:46', '2025-05-16 13:29:52', '9735.00'),
(24, 'Susu', 'bahan_baku', 'kg', 150, '26000.00', '0.00', '2025-05-09 12:27:59', '2025-05-09 13:44:51', '0.00'),
(25, 'Santan', 'bahan_baku', 'kg', 92, '29000.00', '0.00', '2025-05-09 13:19:58', '2025-05-09 13:44:51', '0.00'),
(26, 'Kedelai', 'bahan_baku', 'kg', 120, '23000.00', '0.00', '2025-05-17 11:49:26', '2025-05-17 11:50:11', '0.00');

-- --------------------------------------------------------

--
-- Table structure for table `barangsetengahjadidetails`
--

CREATE TABLE `barangsetengahjadidetails` (
  `id` int(11) NOT NULL,
  `qty` float NOT NULL,
  `harga` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `produksi_id` int(11) DEFAULT NULL,
  `barang_id` int(11) DEFAULT NULL,
  `subtotal` decimal(15,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `barangsetengahjadidetails`
--

INSERT INTO `barangsetengahjadidetails` (`id`, `qty`, `harga`, `createdAt`, `updatedAt`, `produksi_id`, `barang_id`, `subtotal`) VALUES
(1, 3, 10000, '2025-05-08 13:18:49', '2025-05-08 13:18:49', NULL, NULL, '0.00'),
(2, 2, 12000, '2025-05-08 13:18:49', '2025-05-08 13:18:49', NULL, NULL, '0.00'),
(3, 3, 10000, '2025-05-08 13:27:18', '2025-05-08 13:27:18', NULL, NULL, '0.00'),
(4, 5, 8000, '2025-05-08 13:27:18', '2025-05-08 13:27:18', NULL, NULL, '0.00'),
(19, 10, 100000, '2025-05-09 12:18:00', '2025-05-09 12:18:00', 10, 12, '1000000.00'),
(20, 8, 10000, '2025-05-09 12:18:00', '2025-05-09 12:18:00', 10, 10, '80000.00'),
(21, 1, 29000, '2025-05-09 13:38:46', '2025-05-09 13:38:46', 11, 25, '29000.00'),
(22, 1, 29000, '2025-05-09 13:42:44', '2025-05-09 13:42:44', 12, 25, '29000.00'),
(23, 1, 26000, '2025-05-09 13:42:44', '2025-05-09 13:42:44', 12, 24, '26000.00'),
(24, 1, 10000, '2025-05-09 13:42:44', '2025-05-09 13:42:44', 12, 12, '10000.00'),
(25, 1, 31000, '2025-05-09 13:42:44', '2025-05-09 13:42:44', 12, 10, '31000.00'),
(26, 26, 29000, '2025-05-09 13:44:51', '2025-05-09 13:44:51', 13, 25, '754000.00'),
(27, 19, 26000, '2025-05-09 13:44:51', '2025-05-09 13:44:51', 13, 24, '494000.00'),
(28, 20, 10000, '2025-05-09 13:44:51', '2025-05-09 13:44:51', 13, 12, '200000.00'),
(29, 13, 31000, '2025-05-09 13:44:51', '2025-05-09 13:44:51', 13, 10, '403000.00');

-- --------------------------------------------------------

--
-- Table structure for table `barangsetengahjadiproduksis`
--

CREATE TABLE `barangsetengahjadiproduksis` (
  `id` int(11) NOT NULL,
  `tanggal` datetime NOT NULL,
  `keterangan` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `barang_id` int(11) DEFAULT NULL,
  `total_hpp` decimal(15,2) NOT NULL DEFAULT 0.00,
  `qty_hasil` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `barangsetengahjadiproduksis`
--

INSERT INTO `barangsetengahjadiproduksis` (`id`, `tanggal`, `keterangan`, `createdAt`, `updatedAt`, `barang_id`, `total_hpp`, `qty_hasil`) VALUES
(10, '2025-05-09 12:18:00', 'Average Moving Cost', '2025-05-09 12:18:00', '2025-05-09 12:18:00', 21, '1080000.00', 60),
(11, '2025-05-09 13:38:46', '', '2025-05-09 13:38:46', '2025-05-09 13:38:46', 22, '29000.00', 100),
(12, '2025-05-09 13:42:44', 'produksi harian', '2025-05-09 13:42:44', '2025-05-09 13:42:44', 23, '96000.00', 100),
(13, '2025-05-09 13:44:51', 'lagi produksi harian', '2025-05-09 13:44:51', '2025-05-09 13:44:51', 23, '1851000.00', 100);

-- --------------------------------------------------------

--
-- Table structure for table `hargakhusus`
--

CREATE TABLE `hargakhusus` (
  `id` int(11) NOT NULL,
  `harga` decimal(15,2) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `konsumenId` int(11) DEFAULT NULL,
  `barangId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hargakhusus`
--

INSERT INTO `hargakhusus` (`id`, `harga`, `createdAt`, `updatedAt`, `konsumenId`, `barangId`) VALUES
(4, '12000.00', '2025-05-16 12:03:49', '2025-05-16 12:03:49', 3, 18),
(5, '16200.00', '2025-05-16 12:04:01', '2025-05-16 12:04:01', 4, 20),
(6, '21000.00', '2025-05-16 13:22:26', '2025-05-16 13:22:26', 4, 19),
(7, '31000.00', '2025-05-16 13:22:36', '2025-05-16 13:22:36', 4, 18),
(8, '12000.00', '2025-05-16 13:22:55', '2025-05-16 13:22:55', 1, 20),
(9, '61200.00', '2025-05-16 13:23:08', '2025-05-17 12:18:29', 1, 18),
(10, '12000.00', '2025-05-16 13:35:59', '2025-05-16 13:35:59', 3, 20),
(12, '62000.00', '2025-05-19 09:30:14', '2025-05-19 09:30:14', 7, 19);

-- --------------------------------------------------------

--
-- Table structure for table `konsumens`
--

CREATE TABLE `konsumens` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `alamat` varchar(255) DEFAULT NULL,
  `kontak` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `konsumens`
--

INSERT INTO `konsumens` (`id`, `nama`, `alamat`, `kontak`, `createdAt`, `updatedAt`) VALUES
(1, 'Nasi Pedas Bu Andhika', 'Jl. Teuku Umar Barat No 66', '088987898746', '2025-05-16 10:54:14', '2025-05-16 10:54:56'),
(2, 'Hotel Mulia', 'Jl Mekari 89', '089562556522', '2025-05-16 12:01:51', '2025-05-16 12:01:51'),
(3, 'Paddys Pub', 'Villa adelia no 13', '089562556522', '2025-05-16 12:02:09', '2025-05-16 12:02:09'),
(4, 'Fore Coffee', 'Jl. Teuku Umar Barat No 66s', '087989877652', '2025-05-16 12:02:29', '2025-05-16 12:02:29'),
(6, 'Dharmawangsa Suite', 'Villa adelia no 13', '081234567890', '2025-05-17 11:42:36', '2025-05-17 11:42:36'),
(7, 'Jaan Restaurant', 'Jl Legian No 48, Seminyak', '087562334511', '2025-05-17 11:43:24', '2025-05-17 11:43:24'),
(8, 'Bounty Cruises', 'Sidakarya, Denpasar Selatan', '087852663254', '2025-05-17 11:43:47', '2025-05-17 11:43:47'),
(9, 'Blessing Bali', 'Villa adelia no 13', '987906781572', '2025-05-17 11:44:00', '2025-05-17 11:44:00'),
(10, 'King Geprek', 'Jl. Teuku Umar Barat No 66s', '088987898746', '2025-05-17 11:47:53', '2025-05-17 11:47:53'),
(11, 'Suka Kerja Indonesia', 'Jl. Teuku Umar Barat No 66', '088987898746', '2025-05-17 11:48:12', '2025-05-17 11:48:12'),
(12, 'Harvest', 'Jl Mekari 89', '087989877652', '2025-05-17 11:48:24', '2025-05-17 11:48:24');

-- --------------------------------------------------------

--
-- Table structure for table `pembeliandetails`
--

CREATE TABLE `pembeliandetails` (
  `id` int(11) NOT NULL,
  `pembelianId` int(11) DEFAULT NULL,
  `barangId` int(11) DEFAULT NULL,
  `qty` int(11) NOT NULL,
  `harga` decimal(15,2) NOT NULL,
  `subtotal` decimal(15,2) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pembeliandetails`
--

INSERT INTO `pembeliandetails` (`id`, `pembelianId`, `barangId`, `qty`, `harga`, `subtotal`, `createdAt`, `updatedAt`) VALUES
(5, 14, 10, 1, '0.00', '0.00', '2025-04-28 03:52:16', '2025-04-28 03:52:16'),
(9, 20, 12, 60, '10000.00', '600000.00', '2025-04-28 06:20:53', '2025-04-28 06:20:53'),
(10, 20, 10, 78, '12000.00', '936000.00', '2025-04-28 06:20:53', '2025-04-28 06:20:53'),
(11, 21, 12, 136, '10000.00', '1360000.00', '2025-04-28 06:22:30', '2025-04-28 06:22:30'),
(12, 21, 10, 164, '12000.00', '1968000.00', '2025-04-28 06:22:30', '2025-04-28 06:22:30'),
(15, 25, 24, 150, '20000.00', '3000000.00', '2025-05-09 12:40:41', '2025-05-09 12:40:41'),
(16, 26, 24, 20, '26000.00', '520000.00', '2025-05-09 12:41:43', '2025-05-09 12:41:43'),
(17, 27, 25, 120, '29000.00', '3480000.00', '2025-05-09 13:21:55', '2025-05-09 13:21:55'),
(18, 28, 10, 15, '31000.00', '465000.00', '2025-05-09 13:41:22', '2025-05-09 13:41:22'),
(19, 29, 26, 120, '23000.00', '2760000.00', '2025-05-17 11:50:11', '2025-05-17 11:50:11');

-- --------------------------------------------------------

--
-- Table structure for table `pembelians`
--

CREATE TABLE `pembelians` (
  `id` int(11) NOT NULL,
  `supplierId` int(11) DEFAULT NULL,
  `tanggal` datetime NOT NULL,
  `total` decimal(15,2) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pembelians`
--

INSERT INTO `pembelians` (`id`, `supplierId`, `tanggal`, `total`, `createdAt`, `updatedAt`) VALUES
(3, 1, '2025-04-20 00:00:00', '155000.00', '2025-04-25 07:21:23', '2025-04-25 07:21:23'),
(14, 1, '2025-04-28 03:52:16', '0.00', '2025-04-28 03:52:16', '2025-04-28 03:52:16'),
(20, 9, '2025-04-28 06:20:53', '1536000.00', '2025-04-28 06:20:53', '2025-04-28 06:20:53'),
(21, 10, '2025-04-28 06:22:30', '3328000.00', '2025-04-28 06:22:30', '2025-04-28 06:22:30'),
(25, 1, '2025-05-09 12:40:41', '3000000.00', '2025-05-09 12:40:41', '2025-05-09 12:40:41'),
(26, 9, '2025-05-09 12:41:43', '520000.00', '2025-05-09 12:41:43', '2025-05-09 12:41:43'),
(27, 9, '2025-05-09 13:21:55', '3480000.00', '2025-05-09 13:21:55', '2025-05-09 13:21:55'),
(28, 9, '2025-05-09 13:41:22', '465000.00', '2025-05-09 13:41:22', '2025-05-09 13:41:22'),
(29, 9, '2025-05-17 11:50:11', '2760000.00', '2025-05-17 11:50:11', '2025-05-17 11:50:11');

-- --------------------------------------------------------

--
-- Table structure for table `penjualandetails`
--

CREATE TABLE `penjualandetails` (
  `id` int(11) NOT NULL,
  `penjualanId` int(11) DEFAULT NULL,
  `barangId` int(11) DEFAULT NULL,
  `qty` int(11) NOT NULL,
  `harga` decimal(15,2) NOT NULL,
  `subtotal` decimal(15,2) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `penjualandetails`
--

INSERT INTO `penjualandetails` (`id`, `penjualanId`, `barangId`, `qty`, `harga`, `subtotal`, `createdAt`, `updatedAt`) VALUES
(14, 37, 20, 2, '12000.00', '24000.00', '2025-05-16 13:37:26', '2025-05-16 13:37:26'),
(15, 37, 19, 3, '23000.00', '69000.00', '2025-05-16 13:37:26', '2025-05-16 13:37:26'),
(16, 37, 18, 2, '12000.00', '24000.00', '2025-05-16 13:37:26', '2025-05-16 13:37:26'),
(19, 39, 20, 1, '12000.00', '12000.00', '2025-05-17 10:50:46', '2025-05-17 10:50:46'),
(20, 39, 19, 1, '56200.00', '56200.00', '2025-05-17 10:50:46', '2025-05-17 10:50:46'),
(21, 39, 18, 1, '31000.00', '31000.00', '2025-05-17 10:50:46', '2025-05-17 10:50:46'),
(22, 40, 20, 2, '20000.00', '40000.00', '2025-05-19 07:19:35', '2025-05-19 07:19:35'),
(23, 40, 19, 3, '13600.00', '40800.00', '2025-05-19 07:19:35', '2025-05-19 07:19:35'),
(24, 40, 18, 2, '29000.00', '58000.00', '2025-05-19 07:19:35', '2025-05-19 07:19:35'),
(25, 41, 20, 4, '16200.00', '64800.00', '2025-05-19 08:22:59', '2025-05-19 08:22:59'),
(26, 41, 18, 7, '31000.00', '217000.00', '2025-05-19 08:22:59', '2025-05-19 08:22:59'),
(27, 42, 20, 2, '12000.00', '24000.00', '2025-05-19 09:14:53', '2025-05-19 09:14:53'),
(28, 42, 18, 1, '61200.00', '61200.00', '2025-05-19 09:14:53', '2025-05-19 09:14:53'),
(29, 43, 19, 2, '18000.00', '36000.00', '2025-05-19 09:26:24', '2025-05-19 09:26:24'),
(30, 44, 19, 2, '62000.00', '124000.00', '2025-05-19 09:32:42', '2025-05-19 09:32:42'),
(31, 45, 20, 5, '192000.00', '960000.00', '2025-05-20 12:20:23', '2025-05-20 12:20:23'),
(32, 45, 19, 2, '452630.00', '905260.00', '2025-05-20 12:20:23', '2025-05-20 12:20:23'),
(33, 45, 18, 3, '150000.00', '450000.00', '2025-05-20 12:20:23', '2025-05-20 12:20:23'),
(34, 46, 19, 2, '21000.00', '42000.00', '2025-05-20 13:04:16', '2025-05-20 13:04:16');

-- --------------------------------------------------------

--
-- Table structure for table `penjualans`
--

CREATE TABLE `penjualans` (
  `id` int(11) NOT NULL,
  `tanggal` datetime NOT NULL,
  `total` decimal(15,2) NOT NULL,
  `keterangan` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `status_pembayaran` enum('lunas','hutang') NOT NULL DEFAULT 'lunas',
  `konsumenId` int(11) DEFAULT NULL,
  `metode_pembayaran` enum('cash','qris') NOT NULL DEFAULT 'cash'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `penjualans`
--

INSERT INTO `penjualans` (`id`, `tanggal`, `total`, `keterangan`, `createdAt`, `updatedAt`, `status_pembayaran`, `konsumenId`, `metode_pembayaran`) VALUES
(37, '2025-05-16 00:00:00', '117000.00', 'Coba lagi', '2025-05-16 13:37:26', '2025-05-19 09:43:57', 'hutang', 3, 'qris'),
(39, '2025-06-13 00:00:00', '99200.00', 'try again', '2025-05-17 10:50:46', '2025-05-17 10:54:48', 'lunas', 1, 'cash'),
(40, '2025-05-10 00:00:00', '138800.00', 'Test harga manual', '2025-05-19 07:19:35', '2025-05-19 07:19:35', 'hutang', 11, 'cash'),
(41, '2025-05-28 00:00:00', '281800.00', 'nyoba', '2025-05-19 08:22:59', '2025-05-27 12:32:25', 'lunas', 4, 'cash'),
(42, '2025-05-19 09:14:53', '85200.00', NULL, '2025-05-19 09:14:53', '2025-05-19 09:37:41', 'lunas', 1, 'cash'),
(43, '2025-07-05 00:00:00', '36000.00', 'Coba metode pembayaran', '2025-05-19 09:26:24', '2025-05-19 09:26:24', 'hutang', 8, 'cash'),
(44, '2025-08-01 00:00:00', '124000.00', 'coba qris', '2025-05-19 09:32:41', '2025-05-19 09:43:49', 'lunas', 7, 'cash'),
(45, '2025-05-20 12:20:23', '2315260.00', 'Gantung note 2 minggu', '2025-05-20 12:20:23', '2025-05-27 12:32:16', 'lunas', 11, 'qris'),
(46, '2025-05-20 13:04:16', '42000.00', '', '2025-05-20 13:04:16', '2025-05-20 13:04:16', 'lunas', 4, 'cash');

-- --------------------------------------------------------

--
-- Table structure for table `produksidetails`
--

CREATE TABLE `produksidetails` (
  `id` int(11) NOT NULL,
  `produksiId` int(11) DEFAULT NULL,
  `barangId` int(11) DEFAULT NULL,
  `qty` int(11) NOT NULL,
  `harga` decimal(15,2) NOT NULL,
  `subtotal` decimal(15,2) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `produksidetails`
--

INSERT INTO `produksidetails` (`id`, `produksiId`, `barangId`, `qty`, `harga`, `subtotal`, `createdAt`, `updatedAt`) VALUES
(19, 11, 22, 30, '290.00', '8700.00', '2025-05-10 08:04:25', '2025-05-10 08:04:25'),
(20, 12, 23, 2, '9735.00', '19470.00', '2025-05-16 13:28:37', '2025-05-16 13:28:37'),
(21, 12, 22, 2, '290.00', '580.00', '2025-05-16 13:28:37', '2025-05-16 13:28:37'),
(22, 12, 21, 3, '19077.00', '57231.00', '2025-05-16 13:28:37', '2025-05-16 13:28:37'),
(23, 13, 23, 1, '9735.00', '9735.00', '2025-05-16 13:29:52', '2025-05-16 13:29:52'),
(24, 13, 22, 2, '290.00', '580.00', '2025-05-16 13:29:52', '2025-05-16 13:29:52'),
(25, 13, 21, 3, '19077.00', '57231.00', '2025-05-16 13:29:52', '2025-05-16 13:29:52');

-- --------------------------------------------------------

--
-- Table structure for table `produksis`
--

CREATE TABLE `produksis` (
  `id` int(11) NOT NULL,
  `tanggal` datetime NOT NULL,
  `keterangan` text DEFAULT NULL,
  `total_hpp` decimal(15,2) NOT NULL,
  `barang_jadi_id` int(11) DEFAULT NULL,
  `qty_hasil` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `produksis`
--

INSERT INTO `produksis` (`id`, `tanggal`, `keterangan`, `total_hpp`, `barang_jadi_id`, `qty_hasil`, `createdAt`, `updatedAt`) VALUES
(11, '2025-05-10 08:04:25', '', '8700.00', 18, 100, '2025-05-10 08:04:25', '2025-05-10 08:04:25'),
(12, '2025-05-16 13:28:37', '', '77281.00', 20, 210, '2025-05-16 13:28:37', '2025-05-16 13:28:37'),
(13, '2025-05-16 13:29:52', 'Coba jah', '67546.00', 19, 261, '2025-05-16 13:29:52', '2025-05-16 13:29:52');

-- --------------------------------------------------------

--
-- Table structure for table `returpenjualandetails`
--

CREATE TABLE `returpenjualandetails` (
  `id` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `harga` decimal(15,2) NOT NULL,
  `subtotal` decimal(15,2) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `returPenjualanId` int(11) DEFAULT NULL,
  `barangId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `returpenjualandetails`
--

INSERT INTO `returpenjualandetails` (`id`, `qty`, `harga`, `subtotal`, `createdAt`, `updatedAt`, `returPenjualanId`, `barangId`) VALUES
(1, 3, '150000.00', '450000.00', '2025-05-27 08:27:37', '2025-05-27 08:27:37', 1, 18),
(2, 2, '16200.00', '32400.00', '2025-05-27 11:22:40', '2025-05-27 11:22:40', 2, 20);

-- --------------------------------------------------------

--
-- Table structure for table `returpenjualans`
--

CREATE TABLE `returpenjualans` (
  `id` int(11) NOT NULL,
  `tanggal` datetime NOT NULL,
  `total` decimal(15,2) NOT NULL,
  `keterangan` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `penjualanId` int(11) DEFAULT NULL,
  `konsumenId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `returpenjualans`
--

INSERT INTO `returpenjualans` (`id`, `tanggal`, `total`, `keterangan`, `createdAt`, `updatedAt`, `penjualanId`, `konsumenId`) VALUES
(1, '2025-05-27 00:00:00', '450000.00', 'Barang rusak', '2025-05-27 08:27:37', '2025-05-27 08:27:37', 45, 11),
(2, '2025-05-10 00:00:00', '32400.00', '', '2025-05-27 11:22:40', '2025-05-27 11:22:40', 41, 4);

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20250425063721-create-barang.js'),
('20250425064337-create-supplier.js'),
('20250425064408-create-pembelian.js'),
('20250425064429-create-pembelian-detail.js'),
('20250425064526-create-produksi.js'),
('20250425064553-create-produksi-detail.js'),
('20250425064612-create-penjualan.js'),
('20250425064626-create-penjualan-detail.js'),
('20250425073343-create-user.js');

-- --------------------------------------------------------

--
-- Table structure for table `suppliers`
--

CREATE TABLE `suppliers` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `kontak` varchar(255) NOT NULL,
  `alamat` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `suppliers`
--

INSERT INTO `suppliers` (`id`, `nama`, `kontak`, `alamat`, `createdAt`, `updatedAt`) VALUES
(1, 'Supplier A', '081234567890', 'Jl. Mawar No. 3', '2025-04-25 07:12:15', '2025-04-26 05:48:58'),
(9, 'PT. Bahan Sejahtera', '081234567890', 'Jl. Gudang Raya', '2025-04-25 13:24:47', '2025-04-25 13:24:47'),
(10, 'PT Cleo Jaya', '089562556522', 'Jl. Teuku Umar Barat No 66', '2025-04-26 05:45:18', '2025-04-26 05:45:18');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','staff') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
(1, 'admin1', '$2b$10$WOTLqziwSC/KtiiycSai6.B/rGLZqN2R483uAbluPvh9remOce2DK', 'admin', '2025-04-25 07:35:55', '2025-04-25 07:35:55'),
(3, 'admin123', '$2b$10$Gf0LFH75iQkA5RKNO2cNkufX271/ewuAddjgLxoFoHGjZL5dm64GC', 'admin', '2025-04-25 08:16:03', '2025-04-25 08:16:03'),
(4, 'cleo123', '$2b$10$Sv3cb5JFXVwCbb2dIQJ17uXHCVB/dz7As7F5I.Wumypy3Qe2jY1tq', 'staff', '2025-04-25 13:12:11', '2025-04-29 07:56:04'),
(5, 'lagi123', '$2b$10$DFY5Yk4cyqp8vZg9wDACEe1U6BN6MWItJFdXr3TSH7VjwmaOkfaHy', 'admin', '2025-04-25 13:12:28', '2025-04-25 13:12:28'),
(6, 'coba321', '$2b$10$CehPzaBfMnh84nF5Mi2HUepGLXmTUswW2YnU9uCtz/.RHebVlWdve', 'staff', '2025-04-25 13:12:40', '2025-04-25 13:12:40'),
(7, 'coba1', '$2b$10$ymQ/xzPIcSwPSx9n8IJusOzojNvaBkT1uGf83WtS.fkx8vwU0c5k2', 'staff', '2025-04-29 07:40:00', '2025-04-29 07:40:00'),
(8, 'halobcas', '$2b$10$ecYL.2pH2h.AQmbf.PIZk.SZncWUS7AVSt2dijWGkL2etBygey1SO', 'staff', '2025-04-29 07:49:33', '2025-04-29 07:57:59');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `barangs`
--
ALTER TABLE `barangs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `barangsetengahjadidetails`
--
ALTER TABLE `barangsetengahjadidetails`
  ADD PRIMARY KEY (`id`),
  ADD KEY `produksi_id` (`produksi_id`),
  ADD KEY `barang_id` (`barang_id`);

--
-- Indexes for table `barangsetengahjadiproduksis`
--
ALTER TABLE `barangsetengahjadiproduksis`
  ADD PRIMARY KEY (`id`),
  ADD KEY `barang_id` (`barang_id`);

--
-- Indexes for table `hargakhusus`
--
ALTER TABLE `hargakhusus`
  ADD PRIMARY KEY (`id`),
  ADD KEY `konsumenId` (`konsumenId`),
  ADD KEY `barangId` (`barangId`);

--
-- Indexes for table `konsumens`
--
ALTER TABLE `konsumens`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pembeliandetails`
--
ALTER TABLE `pembeliandetails`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pembelianId` (`pembelianId`),
  ADD KEY `barangId` (`barangId`);

--
-- Indexes for table `pembelians`
--
ALTER TABLE `pembelians`
  ADD PRIMARY KEY (`id`),
  ADD KEY `supplierId` (`supplierId`);

--
-- Indexes for table `penjualandetails`
--
ALTER TABLE `penjualandetails`
  ADD PRIMARY KEY (`id`),
  ADD KEY `penjualanId` (`penjualanId`),
  ADD KEY `barangId` (`barangId`);

--
-- Indexes for table `penjualans`
--
ALTER TABLE `penjualans`
  ADD PRIMARY KEY (`id`),
  ADD KEY `konsumenId` (`konsumenId`);

--
-- Indexes for table `produksidetails`
--
ALTER TABLE `produksidetails`
  ADD PRIMARY KEY (`id`),
  ADD KEY `produksiId` (`produksiId`),
  ADD KEY `barangId` (`barangId`);

--
-- Indexes for table `produksis`
--
ALTER TABLE `produksis`
  ADD PRIMARY KEY (`id`),
  ADD KEY `barang_jadi_id` (`barang_jadi_id`);

--
-- Indexes for table `returpenjualandetails`
--
ALTER TABLE `returpenjualandetails`
  ADD PRIMARY KEY (`id`),
  ADD KEY `returPenjualanId` (`returPenjualanId`),
  ADD KEY `barangId` (`barangId`);

--
-- Indexes for table `returpenjualans`
--
ALTER TABLE `returpenjualans`
  ADD PRIMARY KEY (`id`),
  ADD KEY `penjualanId` (`penjualanId`),
  ADD KEY `konsumenId` (`konsumenId`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `suppliers`
--
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `username_2` (`username`),
  ADD UNIQUE KEY `username_3` (`username`),
  ADD UNIQUE KEY `username_4` (`username`),
  ADD UNIQUE KEY `username_5` (`username`),
  ADD UNIQUE KEY `username_6` (`username`),
  ADD UNIQUE KEY `username_7` (`username`),
  ADD UNIQUE KEY `username_8` (`username`),
  ADD UNIQUE KEY `username_9` (`username`),
  ADD UNIQUE KEY `username_10` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `barangs`
--
ALTER TABLE `barangs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `barangsetengahjadidetails`
--
ALTER TABLE `barangsetengahjadidetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `barangsetengahjadiproduksis`
--
ALTER TABLE `barangsetengahjadiproduksis`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `hargakhusus`
--
ALTER TABLE `hargakhusus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `konsumens`
--
ALTER TABLE `konsumens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `pembeliandetails`
--
ALTER TABLE `pembeliandetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `pembelians`
--
ALTER TABLE `pembelians`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `penjualandetails`
--
ALTER TABLE `penjualandetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `penjualans`
--
ALTER TABLE `penjualans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `produksidetails`
--
ALTER TABLE `produksidetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `produksis`
--
ALTER TABLE `produksis`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `returpenjualandetails`
--
ALTER TABLE `returpenjualandetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `returpenjualans`
--
ALTER TABLE `returpenjualans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `barangsetengahjadidetails`
--
ALTER TABLE `barangsetengahjadidetails`
  ADD CONSTRAINT `barangsetengahjadidetails_ibfk_1` FOREIGN KEY (`produksi_id`) REFERENCES `barangsetengahjadiproduksis` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `barangsetengahjadidetails_ibfk_10` FOREIGN KEY (`barang_id`) REFERENCES `barangs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `barangsetengahjadidetails_ibfk_11` FOREIGN KEY (`produksi_id`) REFERENCES `barangsetengahjadiproduksis` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `barangsetengahjadidetails_ibfk_12` FOREIGN KEY (`barang_id`) REFERENCES `barangs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `barangsetengahjadidetails_ibfk_13` FOREIGN KEY (`produksi_id`) REFERENCES `barangsetengahjadiproduksis` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `barangsetengahjadidetails_ibfk_14` FOREIGN KEY (`barang_id`) REFERENCES `barangs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `barangsetengahjadidetails_ibfk_15` FOREIGN KEY (`produksi_id`) REFERENCES `barangsetengahjadiproduksis` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `barangsetengahjadidetails_ibfk_16` FOREIGN KEY (`barang_id`) REFERENCES `barangs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `barangsetengahjadidetails_ibfk_17` FOREIGN KEY (`produksi_id`) REFERENCES `barangsetengahjadiproduksis` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `barangsetengahjadidetails_ibfk_18` FOREIGN KEY (`barang_id`) REFERENCES `barangs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `barangsetengahjadidetails_ibfk_19` FOREIGN KEY (`produksi_id`) REFERENCES `barangsetengahjadiproduksis` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `barangsetengahjadidetails_ibfk_2` FOREIGN KEY (`barang_id`) REFERENCES `barangs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `barangsetengahjadidetails_ibfk_20` FOREIGN KEY (`barang_id`) REFERENCES `barangs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `barangsetengahjadidetails_ibfk_21` FOREIGN KEY (`produksi_id`) REFERENCES `barangsetengahjadiproduksis` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `barangsetengahjadidetails_ibfk_22` FOREIGN KEY (`barang_id`) REFERENCES `barangs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `barangsetengahjadidetails_ibfk_3` FOREIGN KEY (`produksi_id`) REFERENCES `barangsetengahjadiproduksis` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `barangsetengahjadidetails_ibfk_4` FOREIGN KEY (`barang_id`) REFERENCES `barangs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `barangsetengahjadidetails_ibfk_5` FOREIGN KEY (`produksi_id`) REFERENCES `barangsetengahjadiproduksis` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `barangsetengahjadidetails_ibfk_6` FOREIGN KEY (`barang_id`) REFERENCES `barangs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `barangsetengahjadidetails_ibfk_7` FOREIGN KEY (`produksi_id`) REFERENCES `barangsetengahjadiproduksis` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `barangsetengahjadidetails_ibfk_8` FOREIGN KEY (`barang_id`) REFERENCES `barangs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `barangsetengahjadidetails_ibfk_9` FOREIGN KEY (`produksi_id`) REFERENCES `barangsetengahjadiproduksis` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `barangsetengahjadiproduksis`
--
ALTER TABLE `barangsetengahjadiproduksis`
  ADD CONSTRAINT `barangsetengahjadiproduksis_ibfk_1` FOREIGN KEY (`barang_id`) REFERENCES `barangs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `barangsetengahjadiproduksis_ibfk_10` FOREIGN KEY (`barang_id`) REFERENCES `barangs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `barangsetengahjadiproduksis_ibfk_11` FOREIGN KEY (`barang_id`) REFERENCES `barangs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `barangsetengahjadiproduksis_ibfk_2` FOREIGN KEY (`barang_id`) REFERENCES `barangs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `barangsetengahjadiproduksis_ibfk_3` FOREIGN KEY (`barang_id`) REFERENCES `barangs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `barangsetengahjadiproduksis_ibfk_4` FOREIGN KEY (`barang_id`) REFERENCES `barangs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `barangsetengahjadiproduksis_ibfk_5` FOREIGN KEY (`barang_id`) REFERENCES `barangs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `barangsetengahjadiproduksis_ibfk_6` FOREIGN KEY (`barang_id`) REFERENCES `barangs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `barangsetengahjadiproduksis_ibfk_7` FOREIGN KEY (`barang_id`) REFERENCES `barangs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `barangsetengahjadiproduksis_ibfk_8` FOREIGN KEY (`barang_id`) REFERENCES `barangs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `barangsetengahjadiproduksis_ibfk_9` FOREIGN KEY (`barang_id`) REFERENCES `barangs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `hargakhusus`
--
ALTER TABLE `hargakhusus`
  ADD CONSTRAINT `hargakhusus_ibfk_1` FOREIGN KEY (`konsumenId`) REFERENCES `konsumens` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `hargakhusus_ibfk_2` FOREIGN KEY (`barangId`) REFERENCES `barangs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `hargakhusus_ibfk_3` FOREIGN KEY (`konsumenId`) REFERENCES `konsumens` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `hargakhusus_ibfk_4` FOREIGN KEY (`barangId`) REFERENCES `barangs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `hargakhusus_ibfk_5` FOREIGN KEY (`konsumenId`) REFERENCES `konsumens` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `hargakhusus_ibfk_6` FOREIGN KEY (`barangId`) REFERENCES `barangs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `pembeliandetails`
--
ALTER TABLE `pembeliandetails`
  ADD CONSTRAINT `pembeliandetails_ibfk_1` FOREIGN KEY (`pembelianId`) REFERENCES `pembelians` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pembeliandetails_ibfk_10` FOREIGN KEY (`barangId`) REFERENCES `barangs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `pembeliandetails_ibfk_11` FOREIGN KEY (`pembelianId`) REFERENCES `pembelians` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pembeliandetails_ibfk_12` FOREIGN KEY (`barangId`) REFERENCES `barangs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `pembeliandetails_ibfk_13` FOREIGN KEY (`pembelianId`) REFERENCES `pembelians` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pembeliandetails_ibfk_14` FOREIGN KEY (`barangId`) REFERENCES `barangs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `pembeliandetails_ibfk_15` FOREIGN KEY (`pembelianId`) REFERENCES `pembelians` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pembeliandetails_ibfk_16` FOREIGN KEY (`barangId`) REFERENCES `barangs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `pembeliandetails_ibfk_17` FOREIGN KEY (`pembelianId`) REFERENCES `pembelians` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pembeliandetails_ibfk_18` FOREIGN KEY (`barangId`) REFERENCES `barangs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `pembeliandetails_ibfk_19` FOREIGN KEY (`pembelianId`) REFERENCES `pembelians` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pembeliandetails_ibfk_2` FOREIGN KEY (`barangId`) REFERENCES `barangs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `pembeliandetails_ibfk_20` FOREIGN KEY (`barangId`) REFERENCES `barangs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `pembeliandetails_ibfk_21` FOREIGN KEY (`pembelianId`) REFERENCES `pembelians` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pembeliandetails_ibfk_22` FOREIGN KEY (`barangId`) REFERENCES `barangs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `pembeliandetails_ibfk_3` FOREIGN KEY (`pembelianId`) REFERENCES `pembelians` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pembeliandetails_ibfk_4` FOREIGN KEY (`barangId`) REFERENCES `barangs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `pembeliandetails_ibfk_5` FOREIGN KEY (`pembelianId`) REFERENCES `pembelians` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pembeliandetails_ibfk_6` FOREIGN KEY (`barangId`) REFERENCES `barangs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `pembeliandetails_ibfk_7` FOREIGN KEY (`pembelianId`) REFERENCES `pembelians` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pembeliandetails_ibfk_8` FOREIGN KEY (`barangId`) REFERENCES `barangs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `pembeliandetails_ibfk_9` FOREIGN KEY (`pembelianId`) REFERENCES `pembelians` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `pembelians`
--
ALTER TABLE `pembelians`
  ADD CONSTRAINT `pembelians_ibfk_1` FOREIGN KEY (`supplierId`) REFERENCES `suppliers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `pembelians_ibfk_10` FOREIGN KEY (`supplierId`) REFERENCES `suppliers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `pembelians_ibfk_11` FOREIGN KEY (`supplierId`) REFERENCES `suppliers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `pembelians_ibfk_2` FOREIGN KEY (`supplierId`) REFERENCES `suppliers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `pembelians_ibfk_3` FOREIGN KEY (`supplierId`) REFERENCES `suppliers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `pembelians_ibfk_4` FOREIGN KEY (`supplierId`) REFERENCES `suppliers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `pembelians_ibfk_5` FOREIGN KEY (`supplierId`) REFERENCES `suppliers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `pembelians_ibfk_6` FOREIGN KEY (`supplierId`) REFERENCES `suppliers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `pembelians_ibfk_7` FOREIGN KEY (`supplierId`) REFERENCES `suppliers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `pembelians_ibfk_8` FOREIGN KEY (`supplierId`) REFERENCES `suppliers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `pembelians_ibfk_9` FOREIGN KEY (`supplierId`) REFERENCES `suppliers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `penjualandetails`
--
ALTER TABLE `penjualandetails`
  ADD CONSTRAINT `penjualandetails_ibfk_1` FOREIGN KEY (`penjualanId`) REFERENCES `penjualans` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `penjualandetails_ibfk_10` FOREIGN KEY (`barangId`) REFERENCES `barangs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `penjualandetails_ibfk_11` FOREIGN KEY (`penjualanId`) REFERENCES `penjualans` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `penjualandetails_ibfk_12` FOREIGN KEY (`barangId`) REFERENCES `barangs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `penjualandetails_ibfk_13` FOREIGN KEY (`penjualanId`) REFERENCES `penjualans` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `penjualandetails_ibfk_14` FOREIGN KEY (`barangId`) REFERENCES `barangs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `penjualandetails_ibfk_15` FOREIGN KEY (`penjualanId`) REFERENCES `penjualans` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `penjualandetails_ibfk_16` FOREIGN KEY (`barangId`) REFERENCES `barangs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `penjualandetails_ibfk_17` FOREIGN KEY (`penjualanId`) REFERENCES `penjualans` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `penjualandetails_ibfk_18` FOREIGN KEY (`barangId`) REFERENCES `barangs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `penjualandetails_ibfk_19` FOREIGN KEY (`penjualanId`) REFERENCES `penjualans` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `penjualandetails_ibfk_2` FOREIGN KEY (`barangId`) REFERENCES `barangs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `penjualandetails_ibfk_20` FOREIGN KEY (`barangId`) REFERENCES `barangs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `penjualandetails_ibfk_3` FOREIGN KEY (`penjualanId`) REFERENCES `penjualans` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `penjualandetails_ibfk_4` FOREIGN KEY (`barangId`) REFERENCES `barangs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `penjualandetails_ibfk_5` FOREIGN KEY (`penjualanId`) REFERENCES `penjualans` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `penjualandetails_ibfk_6` FOREIGN KEY (`barangId`) REFERENCES `barangs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `penjualandetails_ibfk_7` FOREIGN KEY (`penjualanId`) REFERENCES `penjualans` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `penjualandetails_ibfk_8` FOREIGN KEY (`barangId`) REFERENCES `barangs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `penjualandetails_ibfk_9` FOREIGN KEY (`penjualanId`) REFERENCES `penjualans` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `penjualans`
--
ALTER TABLE `penjualans`
  ADD CONSTRAINT `Penjualans_konsumenId_foreign_idx` FOREIGN KEY (`konsumenId`) REFERENCES `konsumens` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `penjualans_ibfk_1` FOREIGN KEY (`konsumenId`) REFERENCES `konsumens` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `produksidetails`
--
ALTER TABLE `produksidetails`
  ADD CONSTRAINT `produksidetails_ibfk_1` FOREIGN KEY (`produksiId`) REFERENCES `produksis` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `produksidetails_ibfk_10` FOREIGN KEY (`barangId`) REFERENCES `barangs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `produksidetails_ibfk_11` FOREIGN KEY (`produksiId`) REFERENCES `produksis` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `produksidetails_ibfk_12` FOREIGN KEY (`barangId`) REFERENCES `barangs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `produksidetails_ibfk_13` FOREIGN KEY (`produksiId`) REFERENCES `produksis` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `produksidetails_ibfk_14` FOREIGN KEY (`barangId`) REFERENCES `barangs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `produksidetails_ibfk_15` FOREIGN KEY (`produksiId`) REFERENCES `produksis` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `produksidetails_ibfk_16` FOREIGN KEY (`barangId`) REFERENCES `barangs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `produksidetails_ibfk_17` FOREIGN KEY (`produksiId`) REFERENCES `produksis` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `produksidetails_ibfk_18` FOREIGN KEY (`barangId`) REFERENCES `barangs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `produksidetails_ibfk_19` FOREIGN KEY (`produksiId`) REFERENCES `produksis` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `produksidetails_ibfk_2` FOREIGN KEY (`barangId`) REFERENCES `barangs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `produksidetails_ibfk_20` FOREIGN KEY (`barangId`) REFERENCES `barangs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `produksidetails_ibfk_3` FOREIGN KEY (`produksiId`) REFERENCES `produksis` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `produksidetails_ibfk_4` FOREIGN KEY (`barangId`) REFERENCES `barangs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `produksidetails_ibfk_5` FOREIGN KEY (`produksiId`) REFERENCES `produksis` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `produksidetails_ibfk_6` FOREIGN KEY (`barangId`) REFERENCES `barangs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `produksidetails_ibfk_7` FOREIGN KEY (`produksiId`) REFERENCES `produksis` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `produksidetails_ibfk_8` FOREIGN KEY (`barangId`) REFERENCES `barangs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `produksidetails_ibfk_9` FOREIGN KEY (`produksiId`) REFERENCES `produksis` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `produksis`
--
ALTER TABLE `produksis`
  ADD CONSTRAINT `produksis_ibfk_1` FOREIGN KEY (`barang_jadi_id`) REFERENCES `barangs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `produksis_ibfk_10` FOREIGN KEY (`barang_jadi_id`) REFERENCES `barangs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `produksis_ibfk_2` FOREIGN KEY (`barang_jadi_id`) REFERENCES `barangs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `produksis_ibfk_3` FOREIGN KEY (`barang_jadi_id`) REFERENCES `barangs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `produksis_ibfk_4` FOREIGN KEY (`barang_jadi_id`) REFERENCES `barangs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `produksis_ibfk_5` FOREIGN KEY (`barang_jadi_id`) REFERENCES `barangs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `produksis_ibfk_6` FOREIGN KEY (`barang_jadi_id`) REFERENCES `barangs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `produksis_ibfk_7` FOREIGN KEY (`barang_jadi_id`) REFERENCES `barangs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `produksis_ibfk_8` FOREIGN KEY (`barang_jadi_id`) REFERENCES `barangs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `produksis_ibfk_9` FOREIGN KEY (`barang_jadi_id`) REFERENCES `barangs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `returpenjualandetails`
--
ALTER TABLE `returpenjualandetails`
  ADD CONSTRAINT `returpenjualandetails_ibfk_1` FOREIGN KEY (`returPenjualanId`) REFERENCES `returpenjualans` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `returpenjualandetails_ibfk_2` FOREIGN KEY (`barangId`) REFERENCES `barangs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `returpenjualans`
--
ALTER TABLE `returpenjualans`
  ADD CONSTRAINT `returpenjualans_ibfk_1` FOREIGN KEY (`penjualanId`) REFERENCES `penjualans` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `returpenjualans_ibfk_2` FOREIGN KEY (`konsumenId`) REFERENCES `konsumens` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
