import { Column } from '@ant-design/plots';

const GraphComponent = () => {
    const data = [
        {
            type: '1',
            value: 70,
        },
        {
            type: '20',
            value: 58,
        },
        {
            type: '',
            value: 55,
        },
        {
            type: '40',
            value: 63,
        },
        {
            type: '3',
            value: 69,
        },
        {
            type: '60',
            value: 68,
        }
    ];
    const config = {
        data,
        xField: 'type',
        yField: 'value',
        seriesField: '',
        max: '100',
        color: ({ type }) => {
            switch (type) {
                case '1':
                    return 'blue'
                case '20':
                    return 'green'
                case '2':
                    return 'brown'
                case '40':
                    return 'grey'
                case '3':
                    return 'violet'
                case '60':
                    return 'lightgreen'
            }
        },
        label: {
            content: (originData) => {
                // return originData.type === '1' ? '' : originData.type
            }
        },
        legend: true,
        xAxis: {
            label: {
                autoHide: false,
                autoRotate: false,
                autoShow: true
            },
        },
    };
    return <Column {...config} />;
};

export default GraphComponent;