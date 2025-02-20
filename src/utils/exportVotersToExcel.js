import * as XLSX from "xlsx";
import { supabase } from "../lib/supabase";

export const exportVotersToExcel = async (data, fileName = "data.xlsx") => {
    try {
        const hasNisn = data.some((row) => row.nisn)

        const formattedData = data.map((row, index) => {
            let userData = {
                No: index + 1,
                Nama: row.name,
            }

            if (hasNisn) {
                userData.NISN = row.nisn
            }

            return userData
        });

        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "tableName");

        XLSX.writeFile(workbook, fileName);

        console.log(`File Excel ${fileName} berhasil dibuat dari tabel data}!`);
    } catch (error) {
        console.error("Terjadi kesalahan:", error);
    }
};