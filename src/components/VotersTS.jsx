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
} from "@mui/material";
import { supabase } from "../lib/supabase";

const VotersTS = () => {
  const [voters, setVoters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from("ts_voters").select("*")
      setVoters(data);
    };
    fetchData();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Data Pemilih
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nama Pemilih</TableCell>
              <TableCell>Memilih Paslon</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {voters.map((voter, index) => (
              <TableRow key={index}>
                <TableCell>{voter.voter_name}</TableCell>
                <TableCell>{voter.has_voted}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default VotersTS;
