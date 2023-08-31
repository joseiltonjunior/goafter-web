import { useLocation, useNavigate } from 'react-router-dom'
import queryString from 'query-string'
import { useCallback, useEffect, useState } from 'react'
import { AfterProps } from '@/types/after'
import { doc, getDoc } from 'firebase/firestore'
import { firestore } from '@/services/firebase'
import { useToast } from '@/hooks/useToast'
import { Container, Aside, Content, Carousel, ButtonCarousel } from './styles'
import { useKeenSlider } from 'keen-slider/react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { Button } from '@/components/Button'

export function Details() {
  const location = useLocation()
  const params = queryString.parse(location.search)
  const afterId = params.id as string

  const { showToast } = useToast()
  const navigate = useNavigate()

  const [after, setAfter] = useState<AfterProps>()

  const [isLoading, setIsLoading] = useState(false)

  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      perView: 2,
      spacing: 2,
    },
    loop: true,
  })

  const handleFetchAfter = useCallback(async () => {
    setIsLoading(true)

    const docRef = doc(firestore, 'afters', afterId)
    await getDoc(docRef)
      .then((docSnapshot) => {
        if (docSnapshot.exists()) {
          const afterResponse = {
            logoUrl: docSnapshot.data().logoUrl,
            description: docSnapshot.data().description,
            picsUrl: docSnapshot.data().picsUrl,
            indicator: docSnapshot.data().indicator,
            locale: docSnapshot.data().locale,
            name: docSnapshot.data().name,
            phone: docSnapshot.data().phone,
            stars: docSnapshot.data().stars,
            coords: docSnapshot.data().coords,
            type: docSnapshot.data().type,
            recommendation: docSnapshot.data().recommendation,
            schedules: docSnapshot.data().schedules,
            id: docSnapshot.id,
          }

          setAfter(afterResponse)
        }
      })
      .catch(() => {
        showToast('Error while fetching sales', {
          type: 'error',
          theme: 'light',
        })
      })
      .finally(() => setIsLoading(false))
  }, [afterId, showToast])

  useEffect(() => {
    handleFetchAfter()
  }, [handleFetchAfter])

  if (isLoading && !after) {
    return <div>is loading</div>
  }

  return (
    <Container>
      <Aside>
        <img src={after?.logoUrl} alt="after logo" />
        <strong>{after?.name}</strong>
        <div className="flex gap-1">
          <p>{after?.stars}</p>
          <p>({after?.indicator})</p>
        </div>

        <Button variant="outline" onClick={() => navigate('/')}>
          Voltar
        </Button>
      </Aside>
      <Content className="keen-slider" ref={sliderRef}>
        <p>{after?.description}</p>
        <div className="mt-2">
          <p>Tipo: {after?.type}</p>
          <p>Telefone: {after?.phone}</p>
          <p>Endereço: {after?.locale}</p>
        </div>

        <p className="mt-4">Horários</p>
        {after?.schedules.map((item, index) => (
          <div key={index} className="flex justify-between">
            <p>{item.name}</p>
            <p>{item.value}</p>
          </div>
        ))}

        <Carousel>
          <ButtonCarousel
            orientation="prev"
            onClick={() => instanceRef.current?.prev()}
          >
            <FiChevronLeft size={20} />
          </ButtonCarousel>
          {after?.picsUrl.map((picUrl, index) => (
            <img
              key={index}
              src={picUrl}
              alt="pic after"
              className="keen-slider__slide"
            />
          ))}
          <ButtonCarousel
            orientation="next"
            onClick={() => instanceRef.current?.next()}
          >
            <FiChevronRight size={20} />
          </ButtonCarousel>
        </Carousel>
      </Content>
    </Container>
  )
}
