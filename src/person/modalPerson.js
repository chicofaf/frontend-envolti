import { Modal, Input, Form, Select, DatePicker, Spin } from 'antd';
import React from 'react';

import { createPerson, updatePerson } from "./controller";
import moment from 'moment';

class ModalPerson extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      person: props.personEdit,
      loading: false
    };
  }

  

  render() {
    const { personEdit } = this.props;
    
    return <Modal/>
      
    
  }
}

export default ModalPerson;