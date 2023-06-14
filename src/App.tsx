import { Suspense } from 'react'
import { HashRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import Router from '@/routers/index'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

import { QueryClient } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			cacheTime: 1000 * 60 * 60 * 24 // 24 hours
		}
	}
})

const persister = createSyncStoragePersister({
	storage: window.localStorage,
	key: 'userData'
})

dayjs?.locale('zh-cn')

function App() {
	return (
		<HashRouter>
			<ConfigProvider locale={zhCN}>
				<PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
					<Suspense>
						<Router />
					</Suspense>
				</PersistQueryClientProvider>
			</ConfigProvider>
		</HashRouter>
	)
}

export default App
