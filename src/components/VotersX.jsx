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
  Modal,
} from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import { supabase } from "../lib/supabase";
import { exportVotersToExcel } from "../utils/exportVotersToExcel";
import { Cancel, Check, Warning } from "@mui/icons-material";

const VotersX = () => {
  const [value, setValue] = useState(0);
  const [open, setOpenModal] = useState(false);
  const [votersTrue, setVotersTrue] = useState([]);
  const [votersFalse, setVotersFalse] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase
        .from("students_x")
        .select("id, name")
        .eq("voted", true)
        .order("id", { ascending: true });
      setVotersTrue(data);
    };

    const fetchFalseData = async () => {
      const { data } = await supabase
        .from("students_x")
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

  const handleReset = async () => {
    await supabase
      .from("students_x")
      .update({ voted: false })
      .eq("voted", true);
    setOpenModal(false);
  };
  const handleClose = () => {
    setOpenModal(false);
  };

  const currentData =
    value === 0 ? votersTrue : value === 1 ? votersFalse : null;

  return (
    <Box sx={{ p: 3 }}>
      <Modal
        onClose={handleClose}
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            borderRadius: "10px",
            position: "relative",
            p: "20px",
            mt: "10%",
            mx: "auto",
            width: "300px",
            height: "150px",
            bgcolor: "rgb(200, 200, 200)",
          }}
        >
          <Typography variant="h6" id="modal-modal-title">
            Anda Yakin?
          </Typography>
          <Typography id="modal-modal-description">
            Untuk Mereset status pemilih!?
          </Typography>
          <Button
            variant="contained"
            color="success"
            startIcon={<Check />}
            onClick={handleReset}
            sx={{ position: "absolute", bottom: "20px", right: "20px" }}
          >
            Ya
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<Cancel />}
            onClick={() => setOpenModal(false)}
            sx={{ position: "absolute", bottom: "20px", right: "100px" }}
          >
            Batal
          </Button>
        </Box>
      </Modal>

      {value === 0 ? (
        <Typography sx={{ mt: 10 }} variant="h4" gutterBottom>
          Data Pemilih Siswa Kelas X
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
        <Box
          sx={{
            display: "flex",
            gap: 3,
            mb: 2,
            ml: 2,
            mt: 2,
            position: "absolute",
            top: -5,
            right: 0,
          }}
        >
          <Button
            variant="contained"
            color="success"
            startIcon={<PrintIcon />}
            onClick={handleExportExcel}
            sx={{}}
          >
            Cetak Excel
          </Button>
          <Button
            variant="contained"
            color="warning"
            startIcon={<Warning />}
            onClick={() => setOpenModal(true)}
            sx={{}}
          >
            Reset Status Pemilih
          </Button>
        </Box>
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

export default VotersX;
