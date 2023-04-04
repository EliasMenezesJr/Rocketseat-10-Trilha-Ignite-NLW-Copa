interface HomeProps {
  count: number
}



export function Home(props:HomeProps) {
  return (
  <h1>{props.count}</h1>
  )
}

export const getServerSiderProps = async () => {
  const response = await fetch('http://localhost:3333/pools/count')

  const data = await response.json()

  console.log(data);
  return {
    props : {count: data.count}
  }
}