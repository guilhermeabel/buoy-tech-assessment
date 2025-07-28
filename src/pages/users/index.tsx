import React, { useState } from 'react';
import { Table, Input, Avatar, Typography, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import type { ColumnsType, TableProps } from 'antd/es/table';
import type { FilterValue } from 'antd/es/table/interface';
import UsersService from 'services/users';
import { User } from 'services/users/interface';
import { ContentLayout } from 'components/layout/content/contentLayout';

const { Search } = Input;
const { Title } = Typography;

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

	const users = usersResponse?.users || [];

	const filteredUsers = users.filter(user => {
		const firstNameMatch = user.firstName.toLowerCase().includes(firstNameFilter.toLowerCase());
		const lastNameMatch = user.lastName.toLowerCase().includes(lastNameFilter.toLowerCase());
		return firstNameMatch && lastNameMatch;
	});

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
			filterDropdown: () => (
				<div style={{ padding: 8 }}>
					<Search
						placeholder="Search First Name"
						value={firstNameFilter}
						onChange={(e) => setFirstNameFilter(e.target.value)}
						style={{ width: 200 }}
						allowClear
					/>
				</div>
			),
			filterIcon: () => <UserOutlined style={{ color: firstNameFilter ? '#1890ff' : undefined }} />,
		},
		{
			title: 'Last Name',
			dataIndex: 'lastName',
			key: 'lastName',
			filterDropdown: () => (
				<div style={{ padding: 8 }}>
					<Search
						placeholder="Search Last Name"
						value={lastNameFilter}
						onChange={(e) => setLastNameFilter(e.target.value)}
						style={{ width: 200 }}
						allowClear
					/>
				</div>
			),
			filterIcon: () => <UserOutlined style={{ color: lastNameFilter ? '#1890ff' : undefined }} />,
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
							`${range[0]}-${range[1]} of ${total} users`,
					}}
					onChange={handleTableChange}
					scroll={{ x: 800 }}
				/>
			</Space>
		</ContentLayout>
	);
} 
