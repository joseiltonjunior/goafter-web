import { Button } from '@/components/Button'
import { Layout } from '@/components/Layout'
import erroIcon from '@/assets/erro.png'

import { useNavigate } from 'react-router-dom'
import { Container } from './styles'

export function Error() {
  const navigate = useNavigate()

  return (
    <Layout hideHeader>
      <Container>
        <img src={erroIcon} alt="error icon" />
        <div>
          <h1 className="mt-8 text-2xl font-bold">Oops!</h1>
          <p className="text-lg">Página não encontrada.</p>
          <Button
            className="mt-4"
            variant="outline"
            onClick={() => navigate('/')}
          >
            Ir para o início
          </Button>
        </div>
      </Container>
    </Layout>
  )
}
