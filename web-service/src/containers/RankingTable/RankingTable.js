import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, CircularProgress, Typography } from "@mui/material";
import { Progress } from "antd";
import examAPI from "api/examAPI";
import { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { convertSecondToTime } from "utils/convert";

function createData(user_name, point, duration) {
  return { user_name, point, duration };
}

const RankingTable = ({ rankingExam }) => {
  const [rows, setRows] = useState();

  const convertDataToRowTable = (datas) => {
    const rows = [];
    datas.map((data, idx) => {
      rows.push(createData(data?.user_name, data?.point, data?.duration));
    });
    setRows(rows);
  };

  useEffect(() => {
    if (rankingExam) convertDataToRowTable(rankingExam);
  }, []);

  const showTime = (duration) => {
    const time = convertSecondToTime(duration);
    return `${time.minutes}:${time.seconds}`;
  };

  return (
    <TableContainer component={Paper} sx={{ maxHeight: "50vh" }}>
      <Table
        stickyHeader
        sx={{ minWidth: 650 }}
        size='small'
        aria-label='a dense table'
      >
        <TableHead sx={{ display: "table-header-group" }}>
          <TableRow>
            <TableCell align='center'>Stt</TableCell>
            <TableCell>Tên</TableCell>
            <TableCell align='right'>Điểm</TableCell>
            <TableCell align='right'>Thời gian</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows &&
            rows.map((row, idx) => (
              <TableRow
                key={idx}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align='center'>{idx + 1}</TableCell>
                <TableCell component='th' scope='row'>
                  {row.user_name}
                </TableCell>
                <TableCell align='right'>{row.point}</TableCell>
                <TableCell align='right'>{showTime(row.duration)}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RankingTable;
