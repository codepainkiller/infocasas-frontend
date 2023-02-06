import {Layout} from 'antd';
import Title from "antd/lib/typography/Title";
import './App.css'
import TaskList from "./TaskList";

const {Header, Content} = Layout

function App() {
    return (
        <div className="App">
            <Layout>
                <Header className="App-header">
                    <Title level={3}>Lista de tareas</Title>
                </Header>
                <Content className="App-content">
                    <TaskList />
                </Content>
            </Layout>
        </div>
    );
}

export default App;
