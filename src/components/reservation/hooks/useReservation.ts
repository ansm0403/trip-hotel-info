import { useQuery, useMutation } from 'react-query'
import { getHotelWithRoom } from '@remote/hotel'
import { makeReservation } from '@remote/reservation'

import { useAlertContext } from '@contexts/AlertContext'
import { Reservation } from '@models/reservation'

function useReservation({
  hotelId,
  roomId,
}: {
  hotelId: string
  roomId: string
}) {
  const { open } = useAlertContext()
  const { data, isLoading } = useQuery(
    ['hotelWithRoom', hotelId, roomId],
    () => getHotelWithRoom({ hotelId, roomId }),
    {
      onSuccess: ({ room }) => {
        if (room.avaliableCount === 0) {
          open({
            title: '객신이 매진되었습니다.',
            onButtonClick: () => {
              window.history.back()
            },
          })
        }
      },
    },
  )