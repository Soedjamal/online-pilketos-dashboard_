import * as XLSX from "xlsx";
import { supabase } from "../lib/supabase";

export const exportVotersToExcel = async (data, fileName = "data.xlsx") => {
    try {
        // Mengonversi data ke format array dengan nomor urut
        const formattedData = data.map((row, index) => ({
            No: index + 1,
            Nama: row.name,
        }));

        // Membuat worksheet dan workbook
        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "tableName");

        // Menyimpan file Excel
        XLSX.writeFile(workbook, fileName);

        console.log(`File Excel ${fileName} berhasil dibuat dari tabel data}!`);
    } catch (error) {
        console.error("Terjadi kesalahan:", error);
    }
};