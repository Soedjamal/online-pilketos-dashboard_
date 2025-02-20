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
  Container,
  useMediaQuery,
} from "@mui/material";
import { supabase } from "../lib/supabase";
import { BarChart, PieChart } from "@mui/x-charts";


const Candidates = () => {
  const isSmallScreen = useMediaQuery("(max-width:600px)"); // Cek ukuran layar
  const [candidates, setCandidates] = useState([]);
  const [xData, setXData] = useState({ "1": 0, "2": 0 });
  const [xiData, setXiData] = useState({ "1": 0, "2": 0 });
  const [xiiData, setXiiData] = useState({ "1": 0, "2": 0 });
  const [tsData, setTsData] = useState({ "1": 0, "2": 0 });
  const [totalVotes, setTotalVotes] = useState(0);

  const fetchDataCandidates = async () => {
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

  }

  const fetchData = async (table, setData) => {
    const { count: count1, error: error1 } = await supabase
      .from(table)
      .select("*", { count: "exact", head: true })
      .eq("has_voted", "1");


    const { count: count2, error: error2 } = await supabase
      .from(table)
      .select("*", { count: "exact", head: true })
      .eq("has_voted", "2");

    if (error1 || error2) {
      console.error(`Error fetching ${table}:`, error1 || error2);
      return;
    }


    setData({ "1": count1 || 0, "2": count2 || 0 });
  };


  useEffect(() => {
    fetchData("x_voters", setXData);
    fetchData("xi_voters", setXiData);
    fetchData("xii_voters", setXiiData);
    fetchData("ts_voters", setTsData);
    fetchDataCandidates();
  }, []);

  const chartData1 = [
    xData["1"],
    xiData["1"],
    xiiData["1"],
    tsData["1"]
  ];

  const chartData2 = [
    xData["2"],
    xiData["2"],
    xiiData["2"],
    tsData["2"]
  ];


  return (
    <Box sx={{ p: { xs: 2, md: 3 }, mt: { xs: 5, md: 10 } }}>
      <Typography variant={isSmallScreen ? "h5" : "h4"} gutterBottom align="start">
        Hasil Pemilihan
      </Typography>

      {/* Table Responsive */}
      <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
        <Table size={isSmallScreen ? "small" : "medium"}>
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

      <Container sx={{ display: "flex", flexDirection: "column", mt: 4, display: "flex", flexDirection: "column", gap: 3, justifyContent: "center", alignItems: isSmallScreen ? "center" : "" }}>
        <Box sx={{ textAlign: "center", bgcolor: "rgb(240,240,240)", p: 3, borderRadius: 5 }}>
          <Typography sx={{ mb: 4, mt: 4, fontSize: "1.3rem", fontWeight: 600, color: "#505050" }} align="start">Persentase Pemilih :</Typography>
          <PieChart
            sx={{ mr: 5 }}
            series={[
              {
                arcLabel: (item) => `${((item.value / totalVotes) * 100).toFixed(1)}%`,
                data: candidates.map((candidate) => ({
                  id: candidate.id,
                  value: candidate.votes,
                  label: `Paslon ${candidate.paslon_ke}`
                })),
                innerRadius: 2,
                outerRadius: isSmallScreen ? 80 : 100,
                paddingAngle: 2,
                cornerRadius: 5,
              },
            ]}
            colors={["#00838f", "#0277bd"]}
            width={isSmallScreen ? 300 : 400}
            height={isSmallScreen ? 180 : 200}
          />
        </Box >

        <Box sx={{ display: "flex", flexDirection: "column", bgcolor: "rgb(240,240,240)", p: 3, borderRadius: 5 }}>

          <Typography sx={{ mb: 4, mt: 4, fontSize: "1.3rem", fontWeight: 600, color: "#505050" }} align="start">Rata Rata Pemilih Paslon :</Typography>
          <Box sx={{ display: "flex", flexDirection: isSmallScreen ? "column" : "row", gap: 2 }}>
            <BarChart
              xAxis={[{ scaleType: 'band', data: ['X', 'XI', 'XII', 'TS'] }]}
              series={[{ data: chartData1, label: "Paslon 1", color: "#00838f" }]}
              width={isSmallScreen ? 320 : 500}
              height={isSmallScreen ? 250 : 300}
            />
            <BarChart
              xAxis={[{ scaleType: 'band', data: ['X', 'XI', 'XII', 'TS'] }]}
              series={[{ data: chartData2, label: "Paslon 2", color: "#0277bd" }]}
              width={isSmallScreen ? 320 : 500}
              height={isSmallScreen ? 250 : 300}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Candidates;
