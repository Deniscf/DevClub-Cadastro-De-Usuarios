import { useEffect, useState } from 'react'
import api from '../../services/api'
import Button from '../../components/Button'
import TopBackground from '../../components/TopBackground'
import { useNavigate } from 'react-router-dom'
import Trash from '../../assets/trash.svg'
import { Container, Title, ContainerUsers, CardUsers, TrashIcon, AvatarUser } from './styles'

function ListUsers() {

    const [users, setUsers] = useState([])
    const navigate = useNavigate()

    useEffect(() => {

        async function getUsers() {
            const { data } = await api.get('/usuarios')

            setUsers(data)

        }
        getUsers()
    }, [])

    async function deleteUsers(id) {
        await api.delete(`/usuarios/${id}`)

        const updatedUsers = users.filter (user => user.id !== id)

        setUsers (updatedUsers)
    }

    return (
        <Container>
            <TopBackground />
            <Title>Lista de Usuários</Title>

            <ContainerUsers>

                {users.map((user) => (
                        <CardUsers key={user.id}>
                            <AvatarUser src={`https://avatar.iran.liara.run/public?username=${user.id}`} />
                            <div>
                                <h3>{user.name}</h3>
                                <p>{user.email}</p>
                                <p>{user.age}</p>
                            </div>
                            <TrashIcon src={Trash} alt='lixeira' onClick={() => { deleteUsers(user.id)}} />
                        </CardUsers >
                    ))}

            </ContainerUsers>

            <Button type="button" onClick={() => navigate('/')}>Voltar</Button>
        </Container >
    )
}

export default ListUsers