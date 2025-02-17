import { createClient } from "@supabase/supabase-js";
import * as XLSX from "xlsx";
import { supabase } from "../lib/supabase";

export const exportTableToExcel = async (tableName, fileName = "data.xlsx") => {
    try {
        // Fetch data dari Supabase
        const { data, error } = await supabase
            .from(tableName)
            .select("*")
            .order("id", { ascending: true });

        if (error) throw error;
        if (!data.length) {
            console.log(`Table ${tableName} is empty.`);
            return;
        }

        // Mengonversi data ke format array dengan nomor urut
        const formattedData = data.map((row, index) => ({
            No: index + 1,
            Nama: row.name,
            Token: row.token,
        }));

        // Membuat worksheet dan workbook
        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, tableName);

        // Menyimpan file Excel
        XLSX.writeFile(workbook, fileName);

        console.log(`File Excel ${fileName} berhasil dibuat dari tabel ${tableName}!`);
    } catch (error) {
        console.error("Terjadi kesalahan:", error);
    }
};