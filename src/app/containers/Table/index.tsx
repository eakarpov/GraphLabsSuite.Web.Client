import * as React from 'react';
import {Component, SFC, SyntheticEvent} from 'react';
import {Table} from "reactstrap";

interface Props<T> {
  rows: T[];
  headers: string[];
  renderer: SFC<any>;
  onRowClick?: (id: number) => void;
}

class GTable<T extends { id: number }> extends Component<Props<T>> {
  public static defaulProps = {
    rows: [],
    onRowClick: () => {
        // tslint:disable
    },
  };
  constructor(props: Props<T>) {
    super(props);
    this.onRowClick = this.onRowClick.bind(this);
  }
  public render() {
    return (
        <Table>
            <thead>
            <tr>
                {this.props.headers.map((e: string) => (
                    <th>{e}</th>
                ))}
            </tr>
            </thead>
          <tbody>
            {this.props.rows.map((row: { id: number}) => {
              return (
                <tr key={row.id} onClick={this.onRowClick(row.id)} style={{ cursor: 'pointer' }}>
                    {this.props.renderer(row)}
                </tr>
              );
            })}
          </tbody>
        </Table>
    );
  }
  private onRowClick(id: number) {
    return (e: SyntheticEvent<HTMLTableRowElement>) => {
        this.props.onRowClick && this.props.onRowClick(id);
    }
  }
}

export default GTable;