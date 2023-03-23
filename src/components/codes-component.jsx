import { Table, Button, Image, Modal } from 'antd';
import { useState } from 'react';
import '../styles/codes-comp.css';

const CodesComponent = () => {
    const [isModal, setIsModal] = useState({
        isOpen: false,
        statement: ''
    });

    const [selectedRows, setSelectedRows] = useState([]);

    const showModal = (type) => {
        setIsModal({
            isOpen: true,
            statement: !selectedRows.length ? 'Please Select anyone Row' : type === 'add' ? 'Do you want to add a row' : 'Are You Sure you want to delete a row'
        });
    };

    const handleOk = () => {
        setIsModal({
            isOpen: false,
            statement: ''
        });
    };

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRows(selectedRows);
        }
    };

    const data = [{
        key: 1,
        lang: 'English',
        meaning: 'Best Before',
        logo: 'Images'
    }, {
        key: 2,
        lang: 'BULGARIAN',
        meaning: 'Най-добър до',
        logo: true
    }, {
        key: 3,
        lang: 'Chinese',
        meaning: '保质期(至)',
        logo: ''
    }, {
        key: 4,
        lang: 'GEORGIAN',
        meaning: 'მოხმარების ვადა',
        logo: ''
    }];

    const columns = [
        {
            title: 'Language',
            dataIndex: 'lang'
        },
        {
            title: 'Meaning',
            dataIndex: 'meaning',
        },
        {
            title: 'Logo',
            dataIndex: 'logo',
            render: (logo) => typeof(logo) === 'boolean' ? <Image
                width={200}
                src={require("../assets/bulg.jpg")}
                style={{ width: '10%', height: '10%' }} /> : logo,
        }
    ];

    return (
        <div>
            <Table
                rowSelection={{
                    type: 'checkbox',
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={data}
            />
            <div className='codes-button'>
                <Button type="primary" onClick={() => showModal('add')}>Add</Button>
                <Button danger onClick={() => showModal('delete')}>Delete</Button>
            </div>
            <Modal title="Basic Modal" open={isModal.isOpen} onOk={handleOk} onCancel={handleOk}>
                <p>{isModal.statement}</p>
            </Modal>
        </div>
    )
}

export default CodesComponent;