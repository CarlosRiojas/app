import axios from 'axios'

const prefix = '/api/jobs'

const baseURL = process.env.NODE_ENV === 'development' ?
  `http://localhost:3000${prefix}` : prefix

const jobsService = axios.create({
  baseURL,
  // Agregamos with credentials por que el recurso de jobs utiliza al usuario en sesion.
  withCredentials: true
})

// Obtener los trabajos del user
export const getUsrJobs = () => jobsService.get()

// Obtener el detalle de un trabajo
export const getJobDetails = id => jobsService.get(`/${id}`)

// Crear un trabajo
export const createJob = job => jobsService.post('', job)

// Editar un trabajo
export const editJob = (id, job) => jobsService.put(`/${id}`, job)

//Borrar un trabajo
export const deleteJob = id => jobsService.delete(`/${id}`)