import * as React from 'react';
import {Component, SFC, SyntheticEvent} from 'react';
import {Table} from "reactstrap";

interface Props<T> {
  rows: T[];
  headers: string[];
  renderer: SFC<any>;
  onRowClick?: (id: number) => void;
  onHeaderClick?: (name: string) => void;
  sorted?: { asc: boolean; header: string; };
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
    this.onHeaderClick = this.onHeaderClick.bind(this);
  }
  public render() {
    return (
        <Table>
            <thead>
            <tr>
                {this.props.headers.map((e: string, index: number) => (
                    <th
                        key={index}
                        onClick={this.onHeaderClick(e)}
                        style={this.props.onHeaderClick && { cursor: 'pointer' }}
                    >
                        {e} {
                            this.props.sorted
                            && (this.props.sorted.header === e)
                            && (this.props.sorted.asc ? '(asc)' : '(desc)')}
                    </th>
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

  private onHeaderClick(name: string) {
      return () => {
          this.props.onHeaderClick && this.props.onHeaderClick(name);
      }
  }
}

export default GTable;