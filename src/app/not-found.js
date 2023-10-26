import Link from 'next/link';
import dynamic from 'next/dynamic'

const FourOhFour = () => {
  return <>
    <h1>404 - Page Nots Found</h1>
    <Link href="/">
        Go back home
    </Link>
  </>
}

const FourOhFourComponent = dynamic(() => Promise.resolve(FourOhFour), {
  ssr: false,
})

export default FourOhFourComponent;