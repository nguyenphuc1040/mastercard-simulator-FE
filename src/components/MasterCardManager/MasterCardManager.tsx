import { Button, Input, Modal, Radio, Space, Table, Tag } from "antd";
import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import './style.css'
import {MasterCardType} from '../../interfaces/rootInterface';
import MasterCard  from "../MasterCard/MasterCard";
import { useHistory } from 'react-router-dom';


function MasterCardManager() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [typeCard, setTypeCard] = useState("Silver");
    const [name, setName] = useState("");
    const [listCard, setListCard] = useState<MasterCardType[]>([])
    const history = useHistory();
    const columns = [
        {
            title: 'Name',
            dataIndex: 'MasterCardName',
            key: 'MasterCardName',
        },
        {
            title: 'MasterCardNumber',
            dataIndex: 'MasterCardNumber',
            key: 'MasterCardNumber',
        },
        {
            title: 'Action',
            dataIndex: 'MasterCardId',
            key: 'action',
            render: (data: any) => 
              <Space size="middle">
                <Button onClick={()=>{history.push("/"+data)}}> Connect </Button>
              </Space>
            
        },
        
      ];
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        createCard(typeCard,name);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const createCard = (typeCard:any,name:any) => {
        axios.post('https://localhost:5001/api/mastercard/create', {
            MasterCardName: name,
            MasterCardType: typeCard
        })
        .then(response => {
            alert("Sucessfull !")
            fetchDataCard()
        })
        .catch(error => {
            alert(error.data)
        });
    }
    const fetchDataCard = () => {
        return axios.get("https://localhost:5001/api/mastercard")
           .then((response) => {setListCard(response.data)});
        }
    useEffect(() => {
        fetchDataCard()
        }, []);
    return (
        <div className = "card-manager-container">
            <Button type="primary" onClick={showModal}>
                Create Card
            </Button>
            <br />
            <br />
            <Modal
                title="Create MasterCard"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Radio.Group
                value={typeCard}
                onChange={(event) => setTypeCard(event.target.value)}
                >
                    <Radio.Button value="Silver">Silver</Radio.Button>
                    <Radio.Button value="Golden">Golden</Radio.Button>
                    <Radio.Button value="Platin">Platin</Radio.Button>
                    <Radio.Button value="Diamond">Diamond</Radio.Button>
                </Radio.Group>
                <br />
                <br />
                <Input placeholder="Full Name" onChange={(event)=> setName(event.target.value)} />
            </Modal>

            <div className = "list-card">
                <Table columns={columns} dataSource={listCard} />
            </div>
        </div>
  );
}

export default MasterCardManager;
