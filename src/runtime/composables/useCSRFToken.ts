import { useState } from '#imports'

export const useCSRFToken = () => useState<string>('csrf-token')
