import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import styled from 'styled-components'

const Home = () => {
	const userData = useQuery({ queryKey: ['userData'], enabled: false })

	useEffect(() => {
		console.log(userData, 'userData')
	}, [])

	return <HomeWrapper>Home</HomeWrapper>
}

const HomeWrapper = styled.div``

export default Home
