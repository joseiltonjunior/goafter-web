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
import { BsStarFill } from 'react-icons/bs'
import { Button } from '@/components/Button'
import { formatPhone } from '@/utils/formatPhone'
import { Map } from '@/components/Map'
import Skeleton from 'react-loading-skeleton'

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
      perView: 1,
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

  if (isLoading) {
    return (
      <Container>
        <Aside>
          <Skeleton width={200} height={200} borderRadius={8} />

          <Skeleton width={140} height={16} className="mt-8" />
          <Skeleton width={90} height={16} />
          <Skeleton width={110} height={16} />

          <Skeleton height={40} width={100} className="mt-4" />
        </Aside>

        <Content>
          <Skeleton height={16} width={140} />
          <Skeleton height={80} />

          <Skeleton width={240} height={16} className="mt-4" />
          <Skeleton height={140} />

          <div className="grid grid-cols-2 gap-8 mt-4 md:grid-cols-1 md:grid-rows-2">
            <Skeleton height={340} />

            <Skeleton height={340} />
          </div>
        </Content>
      </Container>
    )
  }

  return (
    <Container>
      <Aside>
        <img src={after?.logoUrl} alt="after logo" />

        <p className="font-bold mt-6">{after?.name}</p>
        <div className="flex gap-1 items-center ">
          <BsStarFill color={'yellow'} />
          <p className="font-bold">{after?.stars}</p>
          <p>({after?.indicator})</p>
        </div>

        <p>{formatPhone(after?.phone || '')}</p>

        <Button
          className="mt-4"
          variant="outline"
          onClick={() => navigate('/')}
        >
          Voltar
        </Button>
      </Aside>

      <Content>
        <p className="font-bold text-lg">Descrição</p>
        <p>{after?.description}</p>

        <p className="mt-2 font-bold text-lg">Horários de funcionamento</p>
        {after?.schedules.map((item, index) => (
          <div key={index} className="flex justify-between">
            <p>{item.name}</p>
            <p>{item.value}</p>
          </div>
        ))}

        <div className="grid grid-cols-2 gap-8 mt-4 md:grid-cols-1 md:grid-rows-2">
          <Carousel className="keen-slider" ref={sliderRef}>
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
                className="keen-slider__slide object-cover "
              />
            ))}
            <ButtonCarousel
              orientation="next"
              onClick={() => instanceRef.current?.next()}
            >
              <FiChevronRight size={20} />
            </ButtonCarousel>
          </Carousel>

          <div>
            {after && <Map afters={[after]} />}
            <p className="font-bold mt-2">{after?.locale}</p>
          </div>
        </div>
      </Content>
    </Container>
  )
}
