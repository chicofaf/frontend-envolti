import React, { Component } from 'react';
import './App.css';
import { Layout, Table, Button, Popconfirm, message, Spin, Modal, Input, Form, Select} from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";
import { fetchPerson, updatePerson, deletePerson, createPerson} from "./controller";
//import ModalPerson from './modalPerson';
import GoogleBtn from '../security/GoogleBtn';
import moment from 'moment';
import DatePicker from "react-datepicker";

import DateTimePicker from 'react-datetime-picker';


const { Header, Footer, Content } = Layout;

class App extends Component {
  constructor (props) {
    super(props);
    this.state = { 
      persons: [], 
      showModalPerson: false, 
      person: {} , 
      loading: false,
      isLogined: false
    };  

  }

  componentDidMount = () => {
    //this.inicializar();
  }

  inicializar = () => {
    fetchPerson().then(response => {
        const persons = response.data;
        persons.map( p => {
          p.key = p.id;
        });
        this.setState({ persons: persons, loading:false});
    });
  }

  deletePerson = (id)=> {
    this.setState({loading:false});
    deletePerson(id).then(() => {
      this.inicializar();
      this.setState({loading:false});
    });
  }
  
  handleOk = (e) => {
    this.setState({ person: {} });
    this.setState({ showModalPerson: false, person: {} });
    this.inicializar();
    message.success('Sucesso!');
  }

  handleCancel = (e) => {
    this.setState({ person: {}, showModalPerson: false});
  }
  

  salvar = () => {
    let person  = this.state.person;
    
    if(!this.testaCPF(person.cpf)){
      message.error('CPF Inválido!');
      return;
    }

    if(person.nome == null || person.nome == ''){
      message.error('Nome Inválido!');
      return;
    }

    if(person.email != null && person.email !== '' && !this.validateEmail(person.email)){
      message.error('Email Inválido!');
      return;
    }

    //person.nascimento = person.nascimento ? `${person.nascimento.split('/')[2]}-${person.nascimento.split('/')[1]}-${person.nascimento.split('/')[0]}`:null; 
    if (person && person.id) {            
      updatePerson({
        ...person
      }).then(() => {
        this.handleOk();
      });
    } else {
      createPerson({
        ...person
      }).then(() => {
        this.handleOk();
      });
    }        
  }

  testaCPF = (strCPF) => {
    var Soma;
    var Resto;
    Soma = 0;
    if (strCPF == "00000000000") return false;

    for (let i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;

    Soma = 0;
    for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;
  }

  validateEmail = (email) => {
    if (new RegExp('^[a-z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-z0-9]@[a-z0-9][-\.]{0,1}([a-z][-\.]{0,1})*[a-z0-9]\.[a-z0-9]{1,}([\.\-]{0,1}[a-z]){0,}[a-z0-9]{0,}$').test(email)) {
      return (true)
    }
    return (false)
  }

  handleChangeInput = (eventInput) => {
    let newPerson = this.state.person;
    newPerson[eventInput.target.name] = eventInput.target.value;    
    this.setState({
      person : newPerson
    });
  }
  handleSelectSexo = (sexo) => {
    let newPerson = this.state.person;
    newPerson.sexo = sexo;    
    this.setState({
      person : newPerson
    });
  }
  handleDatePickerNascimento = (nascimento) => {
    let newPerson = this.state.person;
    newPerson.nascimento = nascimento;    
    this.setState({
      person : newPerson
    });
  }

  render() {

    const { persons,isLogined} = this.state;

    const columns = [{
        title: 'CPF',
        dataIndex: 'cpf'
    }, {
        title: 'Nome',
        dataIndex: 'nome',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Sexo',
        dataIndex: 'sexo',
    },
    {
        title: 'Nascimento',
        dataIndex: 'nascimento',
    },
    {
        title: 'Naturalidade',
        dataIndex: 'naturalidade',
    },
    {
        title: 'Nacionalidade',
        dataIndex: 'nacionalidade',
    },
    {
      title: <EditOutlined />,
      render: (person) => {
        return <Button
          onClick={ () => {
            this.setState({ person: person, showModalPerson: true })
          } } icon={<EditOutlined />} />
      }
    },
    {
      title: <DeleteOutlined/>,
      render: (person) => {
        return (
          <Popconfirm title={`Remover ${person.nome}?`} onConfirm={ () => this.deletePerson(person.id) }>
            <Button
              icon={<DeleteOutlined/>} />
          </Popconfirm>
        );
      }
    }
    ];
    
    return (      
      <Layout >
        <Spin spinning={this.state.loading}/>
        
        <Header style={ { color: "white", fontSize: 40 } }>PERSON APP</Header>
        
        <GoogleBtn 
          isLogined={() => {
            this.setState({isLogined:true, loading:true}); 
            this.inicializar();
          } }
          isLogouted={() => this.setState({isLogined:false})}
        />

        {isLogined &&
        <Content style={ { padding: "30px" } }>
          <Button
            onClick={ () => {
              this.setState({ person: {}, showModalPerson: true})
            } } icon={<PlusOutlined />}>Novo
            </Button>
          
          <Table
            style={ { marginTop: "10px" } }
            columns={ columns }
            dataSource={ persons }
            rowkKey={ record => record.id }
          />
        </Content>
        }
        
        <Footer>By Francisco</Footer>

        <Modal
          width={ 600 }
          title="Person"
          visible={ this.state.showModalPerson }
          onOk={ () => this.salvar() }
          onCancel={ () => this.handleCancel() }
        >                    
          <Form onSubmit={ this.handleSubmit }>
            <Form.Item label="CPF">
              <Input 
                placeholder="cpf" 
                name="cpf" 
                value={this.state.person.cpf} 
                onChange={this.handleChangeInput}
              />
            </Form.Item>
            <Form.Item label="Nome Completo">
              <Input 
                placeholder="nome completo" 
                name="nome"
                value={this.state.person.nome} 
                onChange={this.handleChangeInput}
              />
            </Form.Item>
            <Form.Item label="Sexo">
              <Select
                name="sexo"  
                value={this.state.person.sexo}
                onChange={this.handleSelectSexo}>
                <Select.Option value="F">Feminino</Select.Option>
                <Select.Option value="M">Masculino</Select.Option>
              </Select>        
            </Form.Item>
            <Form.Item label="Data de Nascimento">
              <DateTimePicker 
                format={'dd/mm/yyyy'}
                value={this.state.person.nascimento}
                onChange={this.handleDatePickerNascimento}
                disableCalendar={true}
                disableClock={true}
              />
            </Form.Item>
            <Form.Item label="Email">
              <Input 
                placeholder="email" 
                name="email" 
                value={this.state.person.email}
                defaultValue={this.state.person.email} 
                onChange={this.handleChangeInput}
              />
            </Form.Item>
            <Form.Item label="Naturalidade">
              <Input 
                placeholder="naturalidade" 
                name="naturalidade" 
                value={this.state.person.naturalidade}
                defaultValue={this.state.person.naturalidade} 
                onChange={this.handleChangeInput}
              />
            </Form.Item>
            <Form.Item label="Nacionalidade">
              <Input 
                placeholder="Nacionalidade" 
                name="nacionalidade" 
                value={this.state.person.nacionalidade}
                defaultValue={this.state.person.nacionalidade} 
                onChange={this.handleChangeInput}
              />
            </Form.Item>
          </Form>
        </Modal>
      </Layout>
    );
  }
}

export default App;
