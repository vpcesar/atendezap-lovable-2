import { createClient } from '@blinkdotnew/sdk'

export const blink = createClient({
  projectId: import.meta.env.VITE_BLINK_PROJECT_ID || 'atendezap-template-para-57zb6wa2',
  publishableKey: import.meta.env.VITE_BLINK_PUBLISHABLE_KEY || 'blnk_pk_5B4pY9h3X8CXwWG3_zcFQ0rmf6ixE3fJ',
  authRequired: false,
  auth: { mode: 'managed' },
})
