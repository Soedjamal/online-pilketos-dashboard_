import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Button,
  CircularProgress,
} from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import { supabase } from "../lib/supabase";
import { exportTableToExcel } from "../utils/exportToExcel";

const VoterCards = () => {
  const [value, setValue] = useState(0);
  const [xstudents, setXstudents] = useState([]);
  const [xistudents, setXistudents] = useState([]);
  const [xiistudents, setXiistudents] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const [loading, setLoading] = useState(true);

  // Optimasi fetch data dengan Promise.all
  useEffect(() => {

    const fetchData = async () => {
      try {
        const [xstudentsResponse, xistudentsResponse, xiistudentsResponse, teachersResponse] = await Promise.all([
          supabase.from('students_x').select('*').order("id", { ascending: true }),
          supabase.from('students_xi').select('*').order("id", { ascending: true }),
          supabase.from('students_xii').select('*').order("id", { ascending: true }),
          supabase.from('teacher_and_staff').select('*').order("id", { ascending: true }),
        ]);

        // Perbaikan pengecekan error
        if (xstudentsResponse.error || xistudentsResponse.error || xiistudentsResponse.error || teachersResponse.error) {
          throw new Error(
            xstudentsResponse.error?.message ||
            xistudentsResponse.error?.message ||
            xiistudentsResponse.error?.message ||
            teachersResponse.error?.message
          );
        }

        setXstudents(xstudentsResponse.data);
        setXistudents(xistudentsResponse.data);
        setXiistudents(xiistudentsResponse.data);
        setTeacher(teachersResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };


    fetchData();
  }, []);

  const handleExportExcel = () => {
    value === 0 ? exportTableToExcel("students_x") : value === 1 ? exportTableToExcel("students_xi") : value === 2 ? exportTableToExcel("students_xii") : exportTableToExcel("teacher_and_staff");
    // if (value === 0) {

    // }
    // if (value === 1) {
    //   exportTableToExcel("students_xi")
    // }
    // if (value === 2) {
    //   exportTableToExcel("students_xii")
    // } else {
    //   exportTableToExcel("teacher_and_staff")
    // }
  }

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = `Kartu Pemilih - ${value === 0 ? "Siswa" : "Guru"}`;
    window.print();
    document.title = originalTitle;
  };
  const currentData = value === 0 ? xstudents : value === 1 ? xistudents : value === 2 ? xiistudents : teacher;

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", minHeight: "100vh", alignItems: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2, "@media print": { p: 0 } }}>
      {/* Header hanya untuk tampilan web */}
      <Box sx={{ mt: 10, "@media print": { display: "none" } }}>
        <Tabs value={value} onChange={(e, newValue) => setValue(newValue)}>
          <Tab onClick={() => console.log(value)} sx={{ fontWeight: 700 }} label={`Siswa X (${xstudents.length})`} />
          <Tab sx={{ fontWeight: 700 }} label={`Siswa XI (${xistudents.length})`} />
          <Tab sx={{ fontWeight: 700 }} label={`Siswa XII (${xiistudents.length})`} />
          <Tab sx={{ fontWeight: 700 }} label={`Guru dan Staff (${teacher.length})`} />
        </Tabs>

        <Button
          variant="contained"
          color="error"
          startIcon={<PrintIcon />}
          onClick={handlePrint}
          sx={{ mb: 2, mt: 2 }}
        >
          Cetak PDF
        </Button>
        <Button
          variant="contained"
          color="success"
          startIcon={<PrintIcon />}
          onClick={handleExportExcel}
          sx={{ mb: 2, ml: 2, mt: 2 }}
        >
          Cetak Excel
        </Button>
      </Box>

      {/* Container untuk cetak */}
      <Box
        sx={{
          columnCount: { xs: 2, print: 3 },
          columnGap: { print: "0.5cm" },
          "@media print": {
            width: "100%",
            margin: 0,
            padding: "0.5cm",
            pageBreakAfter: "always",
          },
        }}
      >
        {currentData.map((user) => (
          <Box
            key={user.token}
            sx={{
              breakInside: "avoid",
              mb: 2,
              p: 1,
              border: "1px solid #ddd",
              borderRadius: "4px",
              height: "100px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              "@media print": {
                height: "3.2cm",
                mb: "0.2cm",
                p: 0.5,
                border: "1px solid #000",
              },
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: "0.8rem",
                "@media print": {
                  fontSize: "10pt",
                  fontWeight: "bold",
                  textAlign: "center"
                },
              }}
            >
              {user.name}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mt: 0.5,
                fontSize: "1.4rem",
                "@media print": {
                  fontSize: "16pt",
                  letterSpacing: "2px",
                },
              }}
            >
              {user.token}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Halaman kosong untuk menghindari margin bawah saat cetak */}
      <Box
        sx={{
          display: "none",
          "@media print": {
            display: "block",
            height: "0",
            pageBreakAfter: "always",
          },
        }}
      />
    </Box>
  );
};

export default VoterCards;
