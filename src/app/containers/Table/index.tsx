import * as React from 'react';
import {Component, SyntheticEvent} from 'react';
import {Table} from "reactstrap";
import {RouteComponentProps, withRouter} from "react-router";
import {ModuleData} from "../../../redux/reducers/modules";

interface Props extends RouteComponentProps<{}> {
  rows: ModuleData[];
}

class GTable extends Component<Props> {
  public static defaulProps = {
    rows: [],
  };
  constructor(props: Props) {
    super(props);
    this.onRowClick = this.onRowClick.bind(this);
  }
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
                <tr key={row.id} onClick={this.onRowClick(row.id)} style={{ cursor: 'pointer' }}>
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
  private onRowClick(id: number) {
    return (e: SyntheticEvent<HTMLTableRowElement>) => {
      this.props.history.push(`/module/${id}`)
    }
  }
}

export default withRouter(GTable);