import React, { useEffect, useState} from 'react';
import { Divider, Button, List, Modal, Input, Row, Col, Checkbox, Typography} from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import {createTask, deleteTask, getTaskList, updateTask} from "./api";


const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [completedValue, setCompletedValue] = useState(false);

    useEffect(() => {
        fetchAllTasks();
    }, []);

    const fetchAllTasks = (params = {}) => {
        getTaskList(params).then(({ data }) => {
            setTasks(sortTasks(data));
        });
    }

    const handleAddTask = () => {
        createTask(newTask).then(response => {
            setTasks([
                response.data,
                ...tasks
            ]);
        }).finally(() => {
            setOpenModal(false);
            setNewTask('');
        })

    };

    const handleChange = (id, data = {}) => {
        updateTask(id, data).then(response => {
            const items = tasks.map(item => {
                if (item.id === id) {
                    return {...item, ...response.data}
                }
                return item;
            });

            setTasks(sortTasks(items));
        });
    };

    const handleDelete = (id) => {
        deleteTask(id).then(() => {
            const items = tasks.filter(item => item.id !== id);
            setTasks(items);
        })
    }

    const sortTasks = (arr) => {
        return arr.sort((a, b) => a.completed - b.completed);
    }

    const handleCloseModal = () => {
        setOpenModal(false);
        setNewTask('');
    }

    const handleFilter = (filters) => {
        fetchAllTasks(filters);
    }

    const handleCompletedCheckbox = (e) => {
        const checked = e.target.checked ;
        setCompletedValue(checked);

        if (checked) {
            fetchAllTasks({ completed: 1 });
        } else {
            fetchAllTasks();
        }
    }

    return (
        <div>
            <Row gutter={16} align={"bottom"}>
                <Col span={16}>
                    <Input.Search
                        placeholder="Buscar tarea"
                        loading={false}
                        enterButton
                        onSearch={name => handleFilter({ name })}
                    />
                </Col>
                <Col span={4}>
                    <Checkbox
                        checked={completedValue}
                        onChange={handleCompletedCheckbox}
                    >Completados</Checkbox>
                </Col>
                <Col span={4}>
                    <Button
                        icon={<PlusOutlined/>}
                        type={"primary"}
                        onClick={() => setOpenModal(true)}
                    >Nueva tarea</Button>
                </Col>
            </Row>
            <Divider />
            <List
                itemLayout="horizontal"
                dataSource={tasks}
                renderItem={(item) => (
                    <List.Item actions={[
                        <Button
                            type="link"
                            icon={<DeleteOutlined/>}
                            onClick={() => handleDelete(item.id)}
                        >Eliminar</Button>]}>

                        <List.Item.Meta
                            avatar={
                                <Checkbox
                                    checked={item.completed}
                                    onChange={e => handleChange(item.id, { completed: e.target.checked})}
                                />
                            }
                            description={
                                <Typography.Text
                                    editable={{
                                        onChange: (name) => handleChange(item.id, {name})
                                    }}
                                    align={"left"}
                                    type={item.completed ? "secondary" : "primary"}
                                    delete={item.completed}
                                >
                                    {item.name}
                                </Typography.Text>
                            }
                        >
                        </List.Item.Meta>

                    </List.Item>
                )}
            >
            </List>

            <Modal
                title="Nueva tarea"
                open={openModal}
                onOk={handleAddTask}
                onCancel={handleCloseModal}
            >
                <Input value={newTask} onChange={e => setNewTask(e.target.value)} />
            </Modal>
        </div>
    )
};

export default TaskList;