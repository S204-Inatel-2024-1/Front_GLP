import React, { useState } from 'react';
import { ConfigProvider,Card, Form, Input, Button, Modal, Space } from "antd";
//import backgroundImage from "'./Campus-Inatel-1.jpg'";
import CSVReader from 'react-csv-reader';

const CadastroEquipe = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [equipes, setEquipes] = useState([]);
    const [editingEquipe, setEditingEquipe] = useState(null);

    const handleOpenModal = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const handleCadastroEquipe = (values) => {
        setEquipes([...equipes, values]);
        handleCloseModal();
    };

    const handleDeleteEquipe = (index) => {
        const updatedEquipes = [...equipes];
        updatedEquipes.splice(index, 1);
        setEquipes(updatedEquipes);
    };

    const handleEditEquipe = (index) => {
        setEditingEquipe(equipes[index]);
        setModalVisible(true);
    };

    const handleForce = (data) => {
        const [teamNumber, projectName, member1Name, member1Email, member2Name, member2Email, member3Name, member3Email, member4Name, member4Email, advisorName, advisorEmail, teamStatus, parallels] = data[0];
        handleCadastroEquipe({teamNumber, projectName, member1Name, member1Email, member2Name, member2Email, member3Name, member3Email, member4Name, member4Email, advisorName, advisorEmail, teamStatus, parallels});
    };

    const handleUpdateEquipe = (updatedValues) => {
        const updatedEquipes = [...equipes];
        const index = equipes.findIndex(equipe => equipe === editingEquipe);
        if (index !== -1) {
            updatedEquipes[index] = updatedValues;
            setEquipes(updatedEquipes);
        }
        setEditingEquipe(null);
        handleCloseModal();
    };

    const equipeToStore = (equipe) => {
        if (equipe === null) {
            return undefined;
        }
    
        return {
            teamNumber: equipe.teamNumber,
            projectName: equipe.projectName,
            member1Name: equipe.member1Name,
            member1Email: equipe.member1Email,
            member2Name: equipe.member2Name,
            member2Email: equipe.member2Email,
            member3Name: equipe.member3Name,
            member3Email: equipe.member3Email,
            member4Name: equipe.member4Name,
            member4Email: equipe.member4Email,
            advisorName: equipe.advisorName,
            advisorEmail: equipe.advisorEmail,
            teamStatus: equipe.teamStatus,
            parallels: equipe.parallels,
        };
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorTextHeading: "white",
                },
                components: {
                    Card: {
                        headerBg: "#0B2031",
                        headerFontSize: 19,
                    },
                },
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                    backgroundSize: "cover",
                }}
            >
                <Card
                    title="Cadastro de Equipe"
                    style={{ width: "800px", textAlign: "center" }}
                >
                    <Button type="primary" onClick={handleOpenModal} style={{ marginBottom: '16px' }}>
                        Adicionar Equipe +
                    </Button>
                    <CSVReader
                        cssClass="csv-reader-input"
                        onFileLoaded={handleForce}
                        onError={() => {}}
                        inputId="ObiWan"
                        inputStyle={{color: 'red'}}
                    />
                   
                    {equipes.map((equipe, index) => (
                        <div key={index} style={{ marginBottom: '8px' }}>
                            <span>Equipe {equipe.teamNumber}: {equipe.projectName}</span>
                            <Space style={{marginLeft: '10px'}}>
                                <Button onClick={() => handleDeleteEquipe(index)} type="primary">Excluir</Button>
                                <Button onClick={() => handleEditEquipe(index)}>Editar</Button>
                            </Space>
                        </div>
                    ))}
                </Card>
            </div>
            <Modal
                title={editingEquipe ? "Editar Equipe" : "Adicionar Equipe"}
                visible={modalVisible}
                onCancel={handleCloseModal}
                footer={null}
            >
                <Form
                    initialValues={equipeToStore(editingEquipe)}
                    onFinish={editingEquipe ? handleUpdateEquipe : handleCadastroEquipe}
                >    
                    <Form.Item
                            name="teamNumber"
                            rules={[{ required: true, message: "Por favor, insira o número da equipe (até 3 caracteres)" }]}
                        >
                            <Input placeholder="Número da Equipe" maxLength={3} />
                        </Form.Item>
                        <Form.Item
                            name="projectName"
                            rules={[{ required: true, message: "Por favor, insira o nome do projeto (até 65 caracteres)" }]}
                        >
                            <Input placeholder="Nome do Projeto" maxLength={65} />
                        </Form.Item>
                        {/* Integrante 01 */}
                        <Form.Item
                            name="member1Name"
                            rules={[{ required: true, message: "Por favor, insira o nome do integrante 01 (até 50 caracteres)" }]}
                        >
                            <Input placeholder="Nome do Integrante 01" maxLength={50} />
                        </Form.Item>
                        <Form.Item
                            name="member1Email"
                            rules={[{ required: true, message: "Por favor, insira o email do integrante 01 (até 30 caracteres)" }]}
                        >
                            <Input placeholder="Email do Integrante 01" maxLength={30} />
                        </Form.Item>
                        {/* Integrante 02 */}
                        <Form.Item
                            name="member2Name"
                        >
                            <Input placeholder="Nome do Integrante 02" maxLength={50} />
                        </Form.Item>
                        <Form.Item
                            name="member2Email"
                        >
                            <Input placeholder="Email do Integrante 02" maxLength={30} />
                        </Form.Item>
                        {/* Integrante 03 */}
                        <Form.Item
                            name="member3Name"
                        >
                            <Input placeholder="Nome do Integrante 03" maxLength={50} />
                        </Form.Item>
                        <Form.Item
                            name="member3Email"
                        >
                            <Input placeholder="Email do Integrante 03" maxLength={30} />
                        </Form.Item>
                        {/* Integrante 04 */}
                        <Form.Item
                            name="member4Name"
                        >
                            <Input placeholder="Nome do Integrante 04" maxLength={50} />
                        </Form.Item>
                        <Form.Item
                            name="member4Email"
                        >
                            <Input placeholder="Email do Integrante 04" maxLength={30} />
                        </Form.Item>
                        {/* Orientador */}
                        <Form.Item
                            name="advisorName"
                            rules={[{ required: true, message: "Por favor, insira o nome do orientador (até 50 caracteres)" }]}
                        >
                            <Input placeholder="Nome do Orientador" maxLength={50} />
                        </Form.Item>
                        <Form.Item
                            name="advisorEmail"
                            rules={[{ required: true, message: "Por favor, insira o email do orientador (até 30 caracteres)" }]}
                        >
                            <Input placeholder="Email do Orientador" maxLength={30} />
                        </Form.Item>
                        {/* Status da Equipe */}
                        <Form.Item
                            name="teamStatus"
                            rules={[{ required: true, message: "Por favor, insira o status da equipe (até 30 caracteres)" }]}
                        >
                            <Input placeholder="Status da Equipe" maxLength={30} />
                        </Form.Item>
                        {/* Paralelas */}
                        <Form.Item
                            name="parallels"
                        >
                            <Input.TextArea placeholder="Paralelas" maxLength={200} />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Cadastrar
                            </Button>
                        </Form.Item>

                </Form>
            </Modal>
        </ConfigProvider>
    );
}

export default CadastroEquipe;
