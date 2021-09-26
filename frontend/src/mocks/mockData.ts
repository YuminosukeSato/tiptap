export {}
import moment from 'moment'

export const users = {
   id: 0,
   name: 'asahara',
   email: 'test@gmail.com',
   hogehoge_id: '000',
   created_at: String(moment('2021-09-22T09:30:00').unix()),
   updated_at: String(moment('2021-09-22T09:30:00').unix()),
}

export const theme_with_single_room_closed = {
   name: "楽天インターン",
   rooms_num: 1,
   close_time: moment('2021-09-22T10:10:00').unix(),
   is_closed: true,
   user_id: 1,
   created_at: moment('2021-09-22T09:25:00').unix(),
   rooms: [
      {
         id: 1,
         name: "楽天インターン",
         total_counts: 220,
         user_room_total_taps: 30,
         users_taps: [
            { user_id: 1, counts: 30, created_at: moment('2021-09-22T09:30:00').unix() },
            { user_id: 2, counts: 10, created_at: moment('2021-09-22T09:34:00').unix() },
            { user_id: 3, counts: 10, created_at: moment('2021-09-22T09:40:00').unix() },
            { user_id: 4, counts: 40, created_at: moment('2021-09-22T09:44:00').unix() },
            { user_id: 5, counts: 40, created_at: moment('2021-09-22T09:50:00').unix() },
            { user_id: 6, counts: 60, created_at: moment('2021-09-22T09:52:00').unix() },
            { user_id: 7, counts: 10, created_at: moment('2021-09-22T09:52:00').unix() },
            { user_id: 8, counts: 10, created_at: moment('2021-09-22T09:55:00').unix() },
            { user_id: 9, counts: 10, created_at: moment('2021-09-22T10:01:00').unix() }
         ],
         taps_ranking: {
            1: { name: "ほげほげ", total_taps: 1000 },
            2: { name: "ぽけぽけ", total_taps: 200 },
            3: { name: "こほこほ", total_taps: 130 }
         }
      }
   ]
}

export const theme_with_two_room_closed = {
   name: "阪神×楽天",
   rooms_num: 2,
   close_time: moment('2021-09-22T10:10:00').unix(),
   is_closed: true,
   user_id: 1,
   created_at: moment('2021-09-22T09:25:00').unix(),
   rooms: [
      {
         id: 1,
         name: "楽天",
         total_counts: 220,
         user_room_total_taps: 30,
         users_taps: [
            { user_id: 1, counts: 30, created_at: moment('2021-09-22T09:30:00').unix() },
            { user_id: 2, counts: 10, created_at: moment('2021-09-22T09:34:00').unix() },
            { user_id: 3, counts: 10, created_at: moment('2021-09-22T09:40:00').unix() },
            { user_id: 4, counts: 40, created_at: moment('2021-09-22T09:44:00').unix() },
            { user_id: 5, counts: 40, created_at: moment('2021-09-22T09:50:00').unix() },
            { user_id: 6, counts: 60, created_at: moment('2021-09-22T09:52:00').unix() },
            { user_id: 7, counts: 10, created_at: moment('2021-09-22T09:52:00').unix() },
            { user_id: 8, counts: 10, created_at: moment('2021-09-22T09:55:00').unix() },
            { user_id: 9, counts: 10, created_at: moment('2021-09-22T10:01:00').unix() }
         ],
         taps_ranking: {
            1: { name: "ほげほげ", total_taps: 1000 },
            2: { name: "ぽけぽけ", total_taps: 200 },
            3: { name: "こほこほ", total_taps: 130 }
         }
      },
      {
         id: 1,
         name: "楽天",
         total_counts: 220,
         user_room_total_taps: 30,
         users_taps: [
            { user_id: 1, counts: 30, created_at: moment('2021-09-22T09:30:00').unix() },
            { user_id: 2, counts: 10, created_at: moment('2021-09-22T09:34:00').unix() },
            { user_id: 3, counts: 10, created_at: moment('2021-09-22T09:40:00').unix() },
            { user_id: 4, counts: 40, created_at: moment('2021-09-22T09:44:00').unix() },
            { user_id: 5, counts: 40, created_at: moment('2021-09-22T09:50:00').unix() },
            { user_id: 6, counts: 60, created_at: moment('2021-09-22T09:52:00').unix() },
            { user_id: 7, counts: 10, created_at: moment('2021-09-22T09:52:00').unix() },
            { user_id: 8, counts: 10, created_at: moment('2021-09-22T09:55:00').unix() },
            { user_id: 9, counts: 10, created_at: moment('2021-09-22T10:01:00').unix() }
         ],
         taps_ranking: {
            1: { name: "ほげほげ", total_taps: 500 },
            2: { name: "ぽけぽけ", total_taps: 100 },
            3: { name: "こほこほ", total_taps: 80 }
         }
      }
   ]
}

// Table "users" {
//   "id" int
//   "name" string
//   "email" string
//   "hogehoge_id" string
//   "created_at" datetime
//   "updated_at" datetime
// }

// Table "user_taps" {
//   "user_id" int [ref:> users.id]
//   "room_id" int [ref:> rooms.id]
//   "counts" int
//   "created_at" datetime
// }

// Table "themes" {
//   "id" int
//   "created_by" int [ref:> users.id]
//   "name" string
//   "rooms_num" int
//   "close_time" datetime
// }

// Table "rooms" {
//   "id" int
//   "theme_id" int [ref:> themes.id]
//   "name" string
// }
