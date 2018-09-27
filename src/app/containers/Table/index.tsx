import * as React from 'react';
import {Component} from 'react';
import {Table} from "reactstrap";

interface Props {
  rows: any[];
}

class GTable extends Component<Props> {
  public static defaulProps = {
    rows: [],
  };
  public render() {
    return (
        <Table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Название</th>
                <th>Описание</th>
                <th>Версия</th>
            </tr>
            </thead>
          <tbody>
            {this.props.rows.map(row => {
              return (
                <tr key={row.id}>
                  <th scope="row">
                    {row.id}
                  </th>
                    <td>{row.name}</td>
                  <td>{row.description}</td>
                  <td>{row.version}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
    );
  }
}

export default GTable;