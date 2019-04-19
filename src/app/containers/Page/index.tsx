import {Component, ReactNode, SFC} from "react";
import * as React from "react";
import PaginationLink from "reactstrap/lib/PaginationLink";
import PaginationItem from "reactstrap/lib/PaginationItem";
import Pagination from "reactstrap/lib/Pagination";
import GTable from "../Table";
import {IPageableState} from "../../../types/redux";
import Button from "reactstrap/lib/Button";
import AsyncWrapper from "../AsyncWrapper";

export interface PageProps<T> {
    headers: string[];
    data: IPageableState<T>;
    renderer: SFC<any>;
    request: (...params: any[]) => void;
}

export interface PageState {
    page: number;
    skip: number;
    limit: number;
    total: number;
    filter: object;
}

export default class Page<T extends { id: number }> extends Component<PageProps<T>, PageState> {
    public state = {
        page: 1,
        limit: 10,
        total: 0,
        skip: 0,
        filter: {},
    };

    constructor(props: PageProps<T>) {
        super(props);
        this.paginate = this.paginate.bind(this);
        this.isDisabled = this.isDisabled.bind(this);
    }


    public componentDidUpdate(prevProps: Readonly<PageProps<T>>, prevState: Readonly<PageState>, snapshot?: any): void {
        if (prevProps.data !== this.props.data) {
            this.setState({
                page: Math.floor(this.props.data.skip / this.props.data.limit) + 1,
                total: this.props.data.total,
            })
        }
    }

    public componentWillMount(): void {
        this.props.request(this.state);
    }

    public render(): ReactNode {
        // tslint:disable
        class ContentTable extends GTable<T> {}
        return (
            <div>
                <AsyncWrapper state={[this.props.data]}>
                    <ContentTable
                        headers={this.props.headers}
                        rows={this.props.data.data}
                        renderer={this.props.renderer}
                    />
                </AsyncWrapper>
                <Pagination aria-label="Навигация">
                    <PaginationItem disabled={this.isDisabled('prev')}>
                        <PaginationLink previous tag={Button} onClick={this.paginate('prev')} />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink>
                            {this.state.page} / {Math.ceil(this.state.total / this.state.limit)}
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem disabled={this.isDisabled('next')}>
                        <PaginationLink next tag={Button} onClick={this.paginate('next')}/>
                    </PaginationItem>
                </Pagination>
            </div>
        )
    }

    private isDisabled(id: string): boolean {
        switch (id) {
            case 'prev':
                return this.state.skip === 0;
            case 'next':
                return (this.state.total - this.state.skip) < this.state.limit;
            default: return false;
        }
    }

    private paginate(id: string) {
        return () => {
          switch (id) {
              case 'prev':
                  this.setState({
                     skip: this.state.skip - this.state.limit,
                     page: this.state.page - 1,
                  }, () => {
                      this.props.request(this.state);
                  });
                  break;
              case 'next':
                  this.setState({
                      skip: this.state.skip + this.state.limit,
                      page: this.state.page + 1,
                  }, () => {
                      // tslint:disable
                      console.log(this.state);
                      this.props.request(this.state);
                  });
                  break;
          }
        };
    }
}