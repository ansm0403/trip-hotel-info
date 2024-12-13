import { Fragment } from 'react'
import Spacing from '@shared/Spacing'
import useHotels from '@/components/hotelList/hook/useHotels'
import Top from '@/components/shared/Top'
import InfiniteScroll from 'react-infinite-scroll-component'
import HotelItem from '@/components/hotelList/HotelItem'

function HotelList() {
  const { data: hotels, hasNextPage, loadMore } = useHotels()

  console.log('hotels', hotels)

  return (
    <div>
      <Top title="인기 호텔" subTitle="호텔부터 펜션까지 최저가" />

      <InfiniteScroll
        dataLength={hotels?.length ?? 0}
        hasMore={hasNextPage}
        loader={<></>}
        next={loadMore}
        scrollThreshold="100px"
      >
        <ul>
          {hotels?.map((hotel, idx) => (
            <Fragment key={hotel.id}>
              <HotelItem hotel={hotel} />
              {hotels.length - 1 === idx ? null : (
                <Spacing
                  size={8}
                  backgroundColor="gray100"
                  style={{ margin: '20px 0' }}
                />
              )}
            </Fragment>
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  )
}

export default HotelList