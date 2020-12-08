import { Container } from 'react-bootstrap'

const Profile = ({ user }) => {
    return (
        <Container>
            <h1>¡Bienvenid@, {user.username}!</h1>
        </Container>
    )
}

export default Profile