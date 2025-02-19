import { useEffect, useState } from "react";
import {
  Box,
  LinearProgress,
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
import { PieChart } from "@mui/x-charts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";

const Candidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [xData, setXData] = useState([])
  // const [fresh, setFresh] = useState(false)
  const [totalVotes, setTotalVotes] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('candidates')
        .select('*').order("created_at", { ascending: true });

      if (error) {
        console.error('Error fetching candidates:', error);
        return;
      }

      if (data) {
        setCandidates(data);
        setTotalVotes(data.reduce((acc, curr) => acc + curr.votes, 0));
      }
    };

    const fetchX = async () => {
      const { data } = await supabase.from("students_x").select("id", { count: "exact", head: true }).eq("voted", true)
      setXData(data)
    }

    fetchX()
    fetchData();
  }, []);



  return (
    <>
      {/* <FontAwesomeIcon style={{ color: "rgb(200,200,200)", position: "absolute", top: "30px", right: "40px", zIndex: "2000" }} onClick={() => setFresh(!fresh)} icon={faRefresh} /> */}
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Hasil Pemilihan
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Paslon</TableCell>
                <TableCell>Ketua</TableCell>
                <TableCell>Wakil</TableCell>
                <TableCell>Total Suara</TableCell>
                <TableCell>Persentase</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {candidates.map((candidate) => (
                <TableRow key={candidate.id}>
                  <TableCell>{candidate.paslon_ke}</TableCell>
                  <TableCell>{candidate.ketua}</TableCell>
                  <TableCell>{candidate.wakil}</TableCell>
                  <TableCell>{candidate.votes}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box sx={{ width: "100%", mr: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={(candidate.votes / totalVotes) * 100}
                        />
                      </Box>
                      <Typography variant="body2">
                        {((candidate.votes / totalVotes) * 100).toFixed(1)}%
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      </Box>

      <div style={{ display: "flex", marginTop: "40px" }}>
        <div style={{ width: "30%", display: "flex", flexDirection: "column", gap: "20px", alignItems: "center" }}>
          <Typography>Persentase Pemilih</Typography>
          <PieChart
            series={[

              {
                arcLabel: (item) => `${((item.value / totalVotes) * 100).toFixed(1)}%`,
                data: candidates.map((candidate) => {
                  return {
                    id: candidate.id,
                    value: candidate.votes,
                    label: `Paslon ${candidate.paslon_ke}`
                  }
                }),
                innerRadius: 2,
                outerRadius: 100,
                paddingAngle: 2,
                cornerRadius: 5,
                startAngle: 0,
                endAngle: 360,

              },
            ]}
            width={400}
            height={200}
          />
        </div>

      </div>
    </>
  );
};

export default Candidates;
