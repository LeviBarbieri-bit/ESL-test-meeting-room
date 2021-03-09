export default {
  addOnSchedules: { method: 'post', url: 'schedules/create' },
  scheduleList: {method: 'get', url: 'schedules/list' },
  editOnSchedules: {method: 'put', url: `schedules/update`},
  deleteOnSchedules: {method: 'delete', url: 'schedules/destroy{/id}'}
}
