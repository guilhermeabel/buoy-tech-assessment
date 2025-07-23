import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './loading.css';

export const Loading = () => {
    return (
        <div className="loading-container">
            <Spin indicator={<LoadingOutlined className="loading-icon" />} />
        </div>
    );
};
