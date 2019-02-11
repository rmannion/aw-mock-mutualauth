import React from 'react';
import { Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';

export default ({ events }) =>
  <Paper>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell>IP</TableCell>
          <TableCell>Mutual Auth Token</TableCell>
          <TableCell>Consumer Auth Token</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        { events.map(e =>
          <TableRow key={e.date}>
            <TableCell>{e.date}</TableCell>
            <TableCell>{e.ip}</TableCell>
            <TableCell>{e.mutualAuthToken}</TableCell>
            <TableCell>{e.consumerAuthToken || <em>none</em>}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </Paper>


