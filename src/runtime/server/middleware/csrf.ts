import { csurf } from 'h3-csrf'

export default defineEventHandler(csurf())
