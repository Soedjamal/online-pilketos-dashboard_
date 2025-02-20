import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  Button,
} from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import { supabase } from "../lib/supabase";
import { exportVotersToExcel } from "../utils/exportVotersToExcel";

const VotersXII = () => {
  const [value, setValue] = useState(0);
  const [votersTrue, setVotersTrue] = useState([]);
  const [votersFalse, setVotersFalse] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase
        .from("students_xi")
        .select("id, name")
        .eq("voted", true)
        .order("id", { ascending: true });
      setVotersTrue(data);
    };

    const fetchFalseData = async () => {
      const { data } = await supabase
        .from("students_xi")
        .select("id, name")
        .eq("voted", false)
        .order("id", { ascending: true });
      setVotersFalse(data);
    };
    fetchFalseData();
    fetchData();
  }, []);

  const handleExportExcel = () => {
    value === 0
      ? exportVotersToExcel(votersTrue)
      : value === 1
        ? exportVotersToExcel(votersFalse)
        : null;
  };
  const currentData =
    value === 0 ? votersTrue : value === 1 ? votersFalse : null;

  return (
    <Box sx={{ p: 3 }}>
      {value === 0 ? (
        <Typography sx={{ mt: 10 }} variant="h4" gutterBottom>
          Data Pemilih Siswa Kelas XI
        </Typography>
      ) : (
        <Typography sx={{ mt: 10 }} variant="h4" gutterBottom>
          Data Belum Memilih
        </Typography>
      )}

      <Tabs
        sx={{ position: "relative", top: 10, py: 2 }}
        value={value}
        onChange={(e, newValue) => setValue(newValue)}
      >
        <Tab
          sx={{ fontWeight: 700 }}
          label={`Telah Memilih (${votersTrue.length})`}
        />
        <Tab
          sx={{ fontWeight: 700 }}
          label={`Belum Memilih (${votersFalse.length})`}
        />
        <Button
          variant="contained"
          color="success"
          startIcon={<PrintIcon />}
          onClick={handleExportExcel}
          sx={{ mb: 2, ml: 2, mt: 2, position: "absolute", top: -5, right: 0 }}
        >
          Cetak Excel
        </Button>
      </Tabs>

      <TableContainer sx={{ mt: 2 }} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Nama Siswa</TableCell>
              {/* <TableCell>Memilih Paslon</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {currentData.map((voter, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{voter.name}</TableCell>
                {/* <TableCell>{voter.has_voted}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default VotersXII;
