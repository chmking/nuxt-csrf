import { csurf } from '@chmking/h3-csrf'

export default defineEventHandler(csurf())
