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
                <tr key={row.Id} onClick={this.onRowClick(row.Id)} style={{ cursor: 'pointer' }}>
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
  private onRowClick(id: number) {
    return (e: SyntheticEvent<HTMLTableRowElement>) => {
      this.props.history.push(`/module/${id}`)
    }
  }
}

export default withRouter(GTable);