import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import {useEffect, useState} from "react"
import travelsApi from '../../../Api/travelApi'
import { Button } from '@material-ui/core';
import {NavLink} from "react-router-dom";
import './TravelTable.css';
import { useTranslation } from 'react-i18next';
 
 
const columns = [
  { id: 'id', label: 'ID', minWidth: 170 },
  {
    id: 'start_destination',
    label: 'start_destination',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'end_destination',
    label: 'end_destination',
    minWidth: 170,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'price',
    label: 'price',
    minWidth: 220,
    align: 'left',
    format: (value) => value.toFixed(2),
  },
];
 
const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 700,
  },
});
 
export default function StickyHeadTable() {
 
  const [travels, setTravels] = useState([]);

  const {t} = useTranslation("controlpanel")
 
  useEffect(() => {
    travelsApi.fetchTravels()
        .then(response => setTravels(response.data))
  }, [])
 
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  let rowid;
 
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
 
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
 
  
  return (
    <Paper className={classes.root} className="travellist">
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableBody>
            {travels.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((travels) =>  (
                <TableRow hover role="checkbox" tabIndex={-1} key={travels.code}>
                  {columns.map((column) => {
                    const travel = travels[column.id];
                    rowid=travels["id"]
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof travel === 'number' ? column.format(travel) : travel}
                      </TableCell>
                    );
                  })}
                  <TableCell>
                    <NavLink to={"/controlpanel/edittravel/" + rowid} key={rowid}>
                      <Button style={{ backgroundColor: "#4caf50",color: "white"}}>{t("edit")}</Button>
                    </NavLink>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        labelRowsPerPage={t("rowsperpage")}
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={travels.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}