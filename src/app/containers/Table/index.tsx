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
            {this.props.rows.map((row, i) => {
              return (
                <tr key={i}>
                  <th scope="row">
                    {row.Id}
                  </th>
                    <td>{row.Name}</td>
                  <td>{row.Description}</td>
                  <td>{row.Version}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
    );
  }
}

export default GTable;