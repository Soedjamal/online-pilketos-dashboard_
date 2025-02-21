import * as XLSX from "xlsx";

export const exportCandidatesToExcel = async (data, totalVotes, fileName = "dataCandidates.xlsx") => {
    try {

        const formattedData = data.map((row, index) => ({
            No: index + 1,
            NamaKetua: row.ketua,
            NamaWakil: row.wakil,
            PaslonKe: row.paslon_ke,
            TotalSuara: row.votes,
            PersentaseSuara: `${((row.votes / totalVotes) * 100).toFixed(1)}%`
        }));

        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "tableName");

        XLSX.writeFile(workbook, fileName);

        console.log(`File Excel ${fileName} berhasil dibuat dari tabel data}!`);
    } catch (error) {
        console.error("Terjadi kesalahan:", error);
    }
};