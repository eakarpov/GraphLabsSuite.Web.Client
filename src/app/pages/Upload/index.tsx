import * as React from 'react';
import {Component, ReactNode} from "react";
import {InjectedAuthRouterProps} from "redux-auth-wrapper/history3/redirect";
import FormGroup from "reactstrap/lib/FormGroup";
import Form from "reactstrap/lib/Form";
import Label from "reactstrap/lib/Label";
import Input from "reactstrap/lib/Input";
import FormText from "reactstrap/lib/FormText";
import Container from "reactstrap/lib/Container";
import Button from "reactstrap/lib/Button";
import api from '../../../api';
import {RouteComponentProps} from "react-router";

export interface UploadProps {

}

type Props = UploadProps & RouteComponentProps<{}> & InjectedAuthRouterProps;

export default class Upload extends Component<Props> {
    private file!: HTMLInputElement|null;
    private id!: HTMLInputElement|null;

    constructor(props: Props) {
        super(props);
        this.setRef = this.setRef.bind(this);
        this.setId = this.setId.bind(this);
        this.onButtonClick = this.onButtonClick.bind(this);
    }


    public render(): ReactNode {
        return (
            <Container>
                <h1>Загрузка нового модуля</h1>
                <Form>
                    <FormGroup>
                        <Label for="exampleFile">Загрузите файл с модулем</Label>
                        <Input innerRef={this.setRef} type="file" name="file" id="exampleFile" />
                        <FormText color="muted">
                            Файл с модулем должен быть zip-архивом с плоской структурой каталогов (содержимое папки build
                            без нее самой).
                        </FormText>
                    </FormGroup>
                    <FormGroup>
                        <Label for="moduleId">Индентификатор</Label>
                        <Input innerRef={this.setId} name="moduleId" id="moduleId" />
                    </FormGroup>
                    <Button onClick={this.onButtonClick}>Загрузить</Button>
                </Form>
            </Container>
        );
    }

    private setRef(i: HTMLInputElement|null) {
        this.file = i;
    }

    private setId(i: HTMLInputElement|null) {
        this.id = i;
    }

    private onButtonClick() {
        const reader = new FileReader();

        reader.onloadend = () => {
            api.uploadModule(this.id && this.id.value || '1', reader.result).then(() => {
                this.props.history.push('/upload');
                alert('Module successfully uploaded!');
            }).catch(() => {
                alert('Error occurred while uploading!');
            });
        };

        if (this.file) {
            const file: File|null = this.file.files && this.file.files[0];
            if (file) {
                reader.readAsArrayBuffer(file);
            } else {
                this.file.src = '';
            }
        }
    }
}
