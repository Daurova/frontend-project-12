import { Container, Paper, Text, Title } from "@mantine/core"
import { Link } from "react-router-dom"

const NotFoundPage = ()=> {
    return (
        <Container>
            <Paper>
                <Title>
        Страница не найдена
        </Title>
        <Text>
            Но вы можете перейти на <Link to='/'>главную страницу</Link>
        </Text>
      

            </Paper>
        </Container>
    )
}

export default NotFoundPage