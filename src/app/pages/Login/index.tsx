import {Component} from "react";
import * as React from "react";
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import Connector from "../../../lib/connector";

export interface Props {

}

class Login extends Component<Props> {
    private password: HTMLInputElement|null;
    private email: HTMLInputElement|null;

    constructor(props: Props) {
        super(props);
        this.login = this.login.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
    }

    public login() {
        const password = this.password ? this.password.value : '';
        const email = this.email ? this.email.value : '';
        Connector.post('odata/auth', { email, password });
    }

    public render() {
        return (
          <Container>
              <Form>
                  <FormGroup>
                      <Label for="email">Email</Label>
                      <Input innerRef={this.setEmail} type="email" name="email" id="email"/>
                  </FormGroup>
                  <FormGroup>
                      <Label for="password">Пароль</Label>
                      <Input innerRef={this.setPassword} type="password" name="password" id="password"/>
                  </FormGroup>
                  <Button onClick={this.login}>Submit</Button>
              </Form>
          </Container>
        );
    }

    private setPassword(i: HTMLInputElement) {
        this.password = i;
    }

    private setEmail(i: HTMLInputElement) {
        this.email = i;
    }
}
export default Login;