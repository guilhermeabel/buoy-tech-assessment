import React, { useState, useMemo } from 'react';
import { Table, Input, Avatar, Typography, Space, Row, Col, Card } from 'antd';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import type { ColumnsType, TableProps } from 'antd/es/table';
import type { FilterValue } from 'antd/es/table/interface';
import UsersService from 'services/users';
import { User } from 'services/users/interface';
import { ContentLayout } from 'components/layout/content/contentLayout';

const { Title, Text } = Typography;

interface TableParams {
	pagination?: {
		current?: number;
		pageSize?: number;
	};
	sortField?: string;
	sortOrder?: string;
	filters?: Record<string, FilterValue | null>;
}

export function Users() {
	const [tableParams, setTableParams] = useState<TableParams>({
		pagination: {
			current: 1,
			pageSize: 13,
		},
	});
	const [firstNameFilter, setFirstNameFilter] = useState<string>('');
	const [lastNameFilter, setLastNameFilter] = useState<string>('');

	const { data: usersResponse, isLoading, error } = useQuery({
		queryKey: ['users'],
		queryFn: () => UsersService.getUsers(),
	});

	const users = useMemo(() => usersResponse?.users || [], [usersResponse]);

	const filteredUsers = useMemo(() => {
		return users.filter(user => {
			const firstNameMatch = user.firstName.toLowerCase().includes(firstNameFilter.toLowerCase());
			const lastNameMatch = user.lastName.toLowerCase().includes(lastNameFilter.toLowerCase());
			return firstNameMatch && lastNameMatch;
		});
	}, [users, firstNameFilter, lastNameFilter]);

	const handleTableChange: TableProps<User>['onChange'] = (
		pagination,
		filters,
		sorter,
	) => {
		setTableParams({
			pagination,
			filters,
			...sorter,
		});
	};

	const columns: ColumnsType<User> = [
		{
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
			width: 80,
		},
				{
			title: 'First Name',
			dataIndex: 'firstName',
			key: 'firstName',
		},
				{
			title: 'Last Name',
			dataIndex: 'lastName',
			key: 'lastName',
		},
		{
			title: 'Name',
			key: 'fullName',
			render: (_, record) => `${record.firstName} ${record.lastName}`,
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
			sorter: (a, b) => a.email.localeCompare(b.email),
			sortDirections: ['ascend', 'descend'],
		},
		{
			title: 'Image',
			dataIndex: 'image',
			key: 'image',
			// Using Avatar component, provides standardized image handling, with fallback, and accessibility support
			render: (imageUrl: string, record: User) => (
				<Avatar
					size={40}
					src={imageUrl}
					alt={`${record.firstName} ${record.lastName}`}
				>
					{`${record.firstName[0]}${record.lastName[0]}`}
				</Avatar>
			),
			width: 80,
		},
	];

	if (error) {
		return (
			<ContentLayout>
				<div style={{ textAlign: 'center', padding: 50 }}>
					<Title level={3}>Error loading users</Title>
					<p>Please try again later.</p>
				</div>
			</ContentLayout>
		);
	}

	return (
		<ContentLayout>
			<Space direction="vertical" size="large" style={{ width: '100%' }}>
				<Title level={2}>Users</Title>
				<Card size="small">
					<Row gutter={[16, 12]} align="middle" wrap>
						<Col xs={24} sm={12} md={8} lg={6}>
							<Input
								placeholder="Search by First Name"
								prefix={<SearchOutlined style={{ color: '#02f59d' }} />}
								value={firstNameFilter}
								onChange={(e) => setFirstNameFilter(e.target.value)}
								allowClear
								data-testid="first-name-filter"
								style={{
									borderColor: firstNameFilter ? '#02f59d' : undefined,
									borderWidth: firstNameFilter ? 2 : 1
								}}
							/>
						</Col>
						<Col xs={24} sm={12} md={8} lg={6}>
							<Input
								placeholder="Search by Last Name"
								prefix={<SearchOutlined style={{ color: '#02f59d' }} />}
								value={lastNameFilter}
								onChange={(e) => setLastNameFilter(e.target.value)}
								allowClear
								data-testid="last-name-filter"
								style={{
									borderColor: lastNameFilter ? '#02f59d' : undefined,
									borderWidth: lastNameFilter ? 2 : 1
								}}
							/>
						</Col>
						{(firstNameFilter || lastNameFilter) && (
							<Col xs={24} sm={24} md={8} lg={6}>
								<Text type="secondary" style={{ 
									fontSize: '13px',
									background: 'rgba(2, 245, 157, 0.1)',
									padding: '4px 8px',
									borderRadius: '4px',
									display: 'inline-block'
								}}>
									Showing {filteredUsers.length} of {users.length} users
								</Text>
							</Col>
						)}
					</Row>
				</Card>

				<Table<User>
					columns={columns}
					dataSource={filteredUsers}
					rowKey="id"
					loading={isLoading}
					pagination={{
						current: tableParams.pagination?.current,
						pageSize: tableParams.pagination?.pageSize,
						total: filteredUsers.length,
						showSizeChanger: false,
						showQuickJumper: false,
						showTotal: (total, range) =>
							`${range[0]}-${range[1]} of ${filteredUsers.length} users`,
					}}
					onChange={handleTableChange}
					scroll={{ x: 800 }}
				/>
			</Space>
		</ContentLayout>
	);
} 
