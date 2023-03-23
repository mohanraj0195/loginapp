import React, { useContext, useEffect, useRef, useState } from 'react';
import { Form, Input, Table } from 'antd';

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };
  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24, width: '100%', height: '100%' }} onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

const GridComponent = () => {
  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      name: 'Legal Requirements',
      gb: '',
      fr: ''
    },
    {
      key: '2',
      name: 'Size restriction',
      gb: '1.2mm',
      fr: '1.2mm'
    },
    {
      key: '3',
      name: 'The word Incredient',
      gb: 'GB2',
      fr: 'FR2'
    },
    {
      key: '4',
      name: 'Incredients (Tea)',
      gb: 'GD50',
      fr: 'FR50(2)'
    },
    {
      key: '5',
      name: 'Net Weight (Grams & Oz)',
      gb: 'GB1 3mm',
      fr: 'FR1(2) 3mm'
    },
    {
      key: '6',
      name: 'Packing Date',
      gb: 'GB3',
      fr: ''
    },
    {
      key: '7',
      name: 'Best Before',
      gb: 'GB4',
      fr: 'FR4(2)'
    },
    {
      key: '8',
      name: 'Blend Name',
      gb: 'GB99',
      fr: 'FR99(2)'
    },
    {
      key: '9',
      name: 'Tea INformation',
      gb: '',
      fr: ''
    },
    {
      key: '10',
      name: 'No. of Tea bags',
      gb: 'GB22',
      fr: ''
    },
    {
      key: '11',
      name: 'Brewing Instructions',
      gb: 'GB7',
      fr: 'FR7'
    },
    {
      key: '12',
      name: 'Storage',
      gb: 'GB5a(2)',
      fr: ''
    },
    {
      key: '13',
      name: 'Packed In/ Shipping (country of origin)',
      gb: '',
      fr: 'FR401'
    },
    {
      key: '14',
      name: 'Factory Address',
      gb: '',
      fr: ''
    },
    {
      key: '15',
      name: 'Exporter / Producer',
      gb: 'GB685',
      fr: ''
    },
    {
      key: '16',
      name: 'Importer (Quality Issue)',
      gb: '',
      fr: ''
    },
    {
      key: '17',
      name: 'Batch No.',
      gb: '',
      fr: ''
    },
    {
      key: '18',
      name: 'Registration Number',
      gb: '',
      fr: ''
    },
    {
      key: '19',
      name: `Trademark Holdre's Address`,
      gb: '',
      fr: ''
    },
    {
      key: '20',
      name: 'GM Free',
      gb: '',
      fr: ''
    },
    {
      key: '21',
      name: 'Owners TM',
      gb: '',
      fr: ''
    },
    {
      key: '22',
      name: 'Tea Origin',
      gb: '',
      fr: ''
    },
    {
      key: '23',
      name: 'Packer No',
      gb: '',
      fr: ''
    },
    {
      key: '24',
      name: 'Sales & Customer Service',
      gb: 'GB',
      fr: ''
    },
    {
      key: '25',
      name: 'Copyright',
      gb: 'GB',
      fr: ''
    },
    {
      key: '26',
      name: 'Barcode',
      gb: 'GB',
      fr: ''
    },
    {
      key: '27',
      name: 'Carton Numer (on Flap)',
      gb: 'GB',
      fr: ''
    },
    {
      key: '28',
      name: 'Great Taste Award.2020 1 star',
      gb: 'greatTaste.png',
      fr: ''
    },
    {
      key: '29',
      name: 'Ethical Tea Partnership LOgo',
      gb: 'teaPartnership.png',
      fr: ''
    },
    {
      key: '30',
      name: 'E Symbol 3mm High',
      gb: 'eLogo.png',
      fr: 'eLogo.png'
    }
  ]);

  const defaultColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: '40%'
    },
    {
      title: 'GB',
      dataIndex: 'gb',
      width: '30%',
      editable: true,
      render(text) {
        return {
          props: {
            style: { background: !text ? "blue" : "" }
          },
          children: text.indexOf('png') > -1 ? <img src={require('../assets/'+text)} style={{width: '50px', height: '50px'}}></img> : <div>{text}</div>
        };
      }
    },
    {
      title: 'FR',
      dataIndex: 'fr',
      width: '30%',
      render(text) {
        return {
          props: {
            style: { background: !text ? "blue" : "" }
          },
          children: text.indexOf('png') > -1 ? <img src={require('../assets/'+text)} style={{width: '50px', height: '50px'}}></img> : <div>{text}</div>
        };
      }
    }
  ];

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <div>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns}
      />
    </div>
  );
};

export default GridComponent;