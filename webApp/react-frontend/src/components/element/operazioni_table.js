import React from 'react';
import { Table, Tag, Space } from 'antd';
import 'antd/dist/antd.css';
export default class OperazioniTable extends React.Component{
    constructor(props){
        super(props);
        this.state={
            ...props
        }
    }

    render(){
        var data_table = [];
        this.props.operazioni.map( (operazione) => {
            console.log(operazione)
            data_table.push(
                {
                    "tipo_operazione":operazione["operazione"]["tipo_operazione"],
                    "data_start":operazione["operazione"]["data_inizio_operazione"],
                    "data_end":operazione["operazione"]["data_fine_operazione"],
                    "operatore":operazione["operatore"]["nome_cognome"],
                    "seriale":operazione["componente"]["seriale"]
                }
            )
        })
        console.log(data_table)
            
          
          const columns = [
            {
              title: 'Tipo Operazione',
              dataIndex: 'tipo_operazione',
              key: 'tipo_operazione',
            },
            {
              title: 'Data inizio ',
              dataIndex: 'data_start',
              key: 'data_start',
            },
            {
              title: 'Data fine',
              dataIndex: 'data_end',
              key: 'data_end',
            },
            {
              title: 'Operatore',
              dataIndex: 'operatore',
              key: 'operatore',
            },
            {
              title: 'Seriale Componente',
              dataIndex: 'seriale',
              key: 'seriale',
            }
          ];
          
          return(<Table pagination={{ defaultPageSize: 3, showSizeChanger: true, pageSizeOptions: ['5', '10', '15']}}
                        dataSource={data_table} columns={columns} scroll={{x:200}} />);
    }
}